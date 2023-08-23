import logger from '@utils/logger';
import { getRootUrl, decodejwt, signJwt } from '@utils/utils';
import { getRCToken, getRCUserByExtensionId } from '@services/ringcentral';
import User from '@models/user';
import { axiosRequest } from './axios-service';
import { basicToken, oneHourTimeStamp, sevenDaysTimeStamp } from '@utils/constants';

export const oauthWithCode = async (req, res) => {
  let rcTokenData = {
    code: req.query.code,
    grant_type: 'authorization_code',
    redirect_uri: process.env.RINGCENTRAL_REDIRECT_URL,
  };

  let rcToken = await getRCToken(rcTokenData);

  let rcUserData = await getRCUserByExtensionId(rcToken.owner_id, rcToken.access_token);

  logger.info({
    message: {
      customMessage: `RC account id of logged in user ${rcUserData?.account?.id}`,
    },
  });

  const dbUserData = await User.findOne({
    email: rcUserData.contact.email,
    isActive: true,
  }).populate('roleId');

  if (!dbUserData) {
    throw { message: 'Access denied' };
  }

  let role = dbUserData.roleId.name;

  await User.updateOne(
    { _id: dbUserData._id },
    {
      $set: {
        lastLoginAt: new Date(),
        extensionId: rcUserData.id,
        rcAccountId: rcUserData.account.id,
        profileImageUri: rcUserData.profileImage.uri,
      },
    }
  );

  let userData = {
    firstName: rcUserData.contact.firstName,
    lastName: rcUserData.contact.lastName,
    email: rcUserData.contact.email,
    rcAccountId: rcUserData.account.id,
    extensionId: rcToken.owner_id,
    profileImageUri: rcUserData.profileImage.uri,
    jobTitle: dbUserData.jobTitle,
    companyName: dbUserData.companyName,
    role,
  };

  const accessTokenPayload = { rcToken, userData };
  const refreshTokenPayload = { rcToken };

  const [jwtToken, refreshToken] = await Promise.all([signJwt(accessTokenPayload), signJwt(refreshTokenPayload, true)]);
  res
    .cookie('accessToken', jwtToken, { httpOnly: true, secure: true, expires: new Date(Date.now() + oneHourTimeStamp) })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + sevenDaysTimeStamp),
    })
    .redirect(req.query.state);
};

export const logoutSvc = async (token) => {
  let decodedJwt = await decodejwt(token);
  decodedJwt = decodedJwt?.payload;

  let rcToken = decodedJwt.rcToken;

  await axiosRequest({
    method: 'POST',
    url: `${process.env.RINGCENTRAL_SERVER_URL}/restapi/oauth/revoke`,
    headers: {
      Authorization: `Basic ${basicToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: new URLSearchParams({
      token: rcToken.access_token,
    }),
  });

  return { message: 'Logged out successfully!', statusCode: 200 };
};
