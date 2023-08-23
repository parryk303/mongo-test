import { getSowSvc, uploadSowSvc } from '@services/sow';
import logger from '@utils/logger';
import { response, sendFailureResponse } from '@utils/utils';

export const getSow = async (req, res) => {
  try {
    let projectId = req.params.id;
    let responseData = await getSowSvc(projectId);
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
        customMessage: 'Error in getSow controller',
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

export const uploadSow = async (req, res) => {
  try {
    let file = req.file;
    let responseData = await uploadSowSvc(file);
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
        customMessage: 'Error in uploadSow controller',
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
