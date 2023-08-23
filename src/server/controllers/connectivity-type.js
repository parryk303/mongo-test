import { getConnectivityTypesSvc } from '@services/connectivity-type';
import logger from '@utils/logger';
import { response, sendFailureResponse } from '@utils/utils';

export const getConnectivityTypes = async (req, res) => {
  try {
    let responseData = await getConnectivityTypesSvc();
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
        customMessage: 'Error in getConnectivityTypes controller',
        errorMessage: error.message,
        stack: error.stack,
      },
      request: req,
      response: res,
    });
    sendFailureResponse({
      res,
      message: error.message || 'Internal server error',
      statusCode: error.statusCode || 500,
    });
  }
};
