import { sendFailureResponse } from '@utils/utils';

export const isAuthorized = (allowedRoles) => {
  return (req, res, next) => {
    if (allowedRoles.includes(req?.userData?.role)) {
      next();
    } else {
      sendFailureResponse({ res, message: 'Forbidden', statusCode: 403 });
    }
  };
};
