import { User } from '@models/index';
import { getAccessTokenFromRC, getRCUserByExtensionId } from '@services/ringcentral';
import logger from '@utils/logger';
import { decodejwt, sendFailureResponse, signJwt } from '@utils/utils';

export const refreshToken = async (token, req, res) => {
  try {
    let decodedJwt = await decodejwt(token);
    let rcRefreshToken = decodedJwt?.payload?.rcToken?.refresh_token;
    let rcToken = await getAccessTokenFromRC(rcRefreshToken);
    let rcUserData = await getRCUserByExtensionId(rcToken.owner_id, rcToken.access_token);

    const dbUserData = await User.findOne({
      rcAccountId: rcUserData.account.id,
      extensionId: rcUserData.id,
      isActive: true,
    }).populate('roleId');

    if (!dbUserData) {
      throw { message: 'Unauthorized' };
    }
    let role = dbUserData.roleId.name;
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
    const [jwtToken, refreshToken] = await Promise.all([
      signJwt(accessTokenPayload),
      signJwt(refreshTokenPayload, true),
    ]);
    res
      .cookie('accessToken', jwtToken, { httpOnly: true, secure: true, expires: new Date(Date.now() + 3600 * 1000) })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
      });
  } catch (e) {
    logger.error({
      message: { customMessage: 'Error in refreshToken middleware', errorMessage: e.message, stack: e.stack },
      request: req,
      response: res,
    });
    throw e;
  }
};
