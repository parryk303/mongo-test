import {
  getMessageCertificateSvc,
  uploadMessageCertificateSvc,
  deleteMessageCertificateSvc,
} from '@services/message-certificate';
import logger from '@utils/logger';
import { response, sendFailureResponse } from '@utils/utils';

export const getMessageCertificate = async (req, res) => {
  try {
    let id = req.params.id;
    let responseData = await getMessageCertificateSvc(id);
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
      name: responseData.name,
      value: responseData.value,
      errors: responseData.errors || [],
    });
  } catch (error) {
    logger.error({
      message: {
        customMessage: 'Error in getMessageCertificate controller',
        errorMessage: error.message,
        stack: error.stack,
      },
      request: req,
      response: res,
    });
    sendFailureResponse({
      res,
      message: error.message,
      statusCode: error.statusCode || 500,
    });
  }
};

export const uploadMessageCertificate = async (req, res) => {
  try {
    let file = req.file;
    let responseData = await uploadMessageCertificateSvc(file, req.body);
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
      name: responseData.name,
      value: responseData.value,
      errors: responseData.errors || [],
    });
  } catch (error) {
    logger.error({
      message: {
        customMessage: 'Error in uploadMessageCertificate controller',
        errorMessage: error.message,
        stack: error.stack,
      },
      request: req,
      response: res,
    });
    sendFailureResponse({
      res,
      message: error.message,
      statusCode: error.statusCode || 500,
    });
  }
};

export const deleteMessageCertificate = async (req, res) => {
  try {
    let id = req.params.id;
    let responseData = await deleteMessageCertificateSvc(id);
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
    });
  } catch (error) {
    logger.error({
      message: {
        customMessage: 'Error in deleteMessageCertificate controller',
        errorMessage: error.message,
        stack: error.stack,
      },
      request: req,
      response: res,
    });
    sendFailureResponse({
      res,
      message: error.message,
      statusCode: error.statusCode || 500,
    });
  }
};
