import { getRolesSvc, getJobTitlesSvc } from '@services/roles';
import logger from '@utils/logger';
import { response, sendFailureResponse } from '@utils/utils';

export const getRoles = async (req, res) => {
  try {
    let responseData = await getRolesSvc();
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
        customMessage: 'Error in getRoles controller',
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

export const getjobTitles = async (req, res) => {
  try {
    let responseData = await getJobTitlesSvc();
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
        customMessage: 'Error in getjobTitles controller',
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
