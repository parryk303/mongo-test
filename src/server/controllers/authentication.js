import { logoutSvc, oauthWithCode } from '@services/authentication';
import logger from '@utils/logger';
import { sendFailureResponse, sendSuccessResponse } from '@utils/utils';
import { accessDeniedMessage } from '@utils/constants';

export const oauth2 = async (req, res) => {
  if (!req.query.state) {
    req.query.state = process.env.DEFAULT_REDIRECT_URI;
  }
  try {
    if (req.query.code) {
      await oauthWithCode(req, res);
    } else {
      if (req.query && req.query.state && !req.query.error) {
        res.redirect(req.query.state);
      } else {
        res.redirect(process.env.DEFAULT_REDIRECT_URI);
      }
    }
  } catch (e) {
    logger.error({
      message: { customMessage: 'Error in oauth2 controller', errorMessage: e.message, stack: e.stack },
      request: req,
      response: res,
    });
    if (e.message == 'Access denied') {
      res.redirect(`${process.env.DEFAULT_REDIRECT_URI}/access-denied?error=${accessDeniedMessage}`);
    } else {
      if (req.query && req.query.state && !req.query.error) {
        res.redirect(`${req.query.state}?error=${e.message}`);
      } else {
        res.redirect(`${process.env.DEFAULT_REDIRECT_URI}?error=${e.message}`);
      }
    }
  }
};

export const logout = async (req, res) => {
  try {
    let token = req.cookies.accessToken;

    if (!token) {
      res.status(400).json({
        error: 'authorization token is missing!',
      });
    } else {
      let responseData = await logoutSvc(token);
      let message = responseData.message;
      sendSuccessResponse({
        res,
        message,
        statusCode: responseData.statusCode,
        clearCookie: true,
      });
    }
  } catch (e) {
    logger.error({
      message: { customMessage: 'Error in logout controller', errorMessage: e.message, stack: e.stack },
      request: req,
      response: res,
    });
    return sendFailureResponse({ res, message: e.message, statusCode: 500, clearCookie: true });
  }
};
