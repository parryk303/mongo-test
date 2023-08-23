import multer from 'multer';

import logger from '@utils/logger';
import { sendFailureResponse } from '@utils/utils';

const upload = multer();
export const uploadFile = (req, res, next) => {
  const singleFileUpload = upload.single('file');
  singleFileUpload(req, res, (err) => {
    try {
      if (req.fileError) {
        throw { message: req.fileError };
      }
      if (err instanceof multer.MulterError) {
        throw { message: err.message || 'Error occured in multer' };
      } else if (err) {
        throw { message: err.message || 'Error occured in file upload.' };
      } else {
        next();
      }
    } catch (err) {
      logger.error({
        message: {
          customMessage: 'Error in SingleFileUpload middleware:',
          errorMessage: err?.message,
          stack: err?.stack,
        },
      });
      sendFailureResponse({ res, message: err?.message, statusCode: 400 });
    }
  });
};
