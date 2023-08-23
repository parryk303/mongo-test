import logger from '@utils/logger';
import User from '@models/user';
import { sendFailureResponse } from '@utils/utils';
import { decodejwt } from '@utils/utils';
import { refreshToken } from './refresh-token';

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    let decoded = await decodejwt(token);
    req.userData = getUserDataFromJWT(decoded);
    const extensionId = decoded?.payload?.userData?.extensionId;
    let user = await fetchUserByExtensionId(extensionId);
    if (user.length > 0) {
      let role = user[0]?.role[0]?.name;
      req.userData.role = role;
      req.userData.userId = user[0]._id;
      next();
    } else {
      sendFailureResponse({ res, message: 'Unauthorized', statusCode: 401, clearCookie: true });
    }
  } catch (err) {
    if (err.code == 'ERR_JWT_EXPIRED' && req?.cookies?.refreshToken) {
      await refreshTokenAndRetry(req, res, next);
    } else {
      logger.error({
        message: {
          customMessage: 'Error in isAuthenticated middleware',
          errorMessage: err.message,
          stack: err.stack,
        },
        request: req,
        response: res,
      });
      sendFailureResponse({ res, message: 'Unauthorized', statusCode: 401, clearCookie: true });
    }
  }
};

const refreshTokenAndRetry = async (req, res, next) => {
  try {
    await refreshToken(req.cookies.refreshToken, req, res);
    await isAuthenticated(req, res, next);
  } catch (e) {
    sendFailureResponse({
      res,
      message: e.message || 'Internal server error',
      statusCode: 401,
      clearCookie: true,
    });
  }
};

const getUserDataFromJWT = (decoded) => {
  return decoded?.payload?.userData || null;
};

const fetchUserByExtensionId = async (extensionId) => {
  return await User.aggregate([
    {
      $lookup: {
        from: 'roles',
        localField: 'roleId',
        foreignField: '_id',
        as: 'role',
      },
    },
    {
      $match: { extensionId },
    },
  ]);
};
