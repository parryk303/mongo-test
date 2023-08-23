import { buildSearchQuery } from '@utils/query-builder';
import { getContactSvc } from '@services/contact';
import { response, sendFailureResponse } from '@utils/utils';
import logger from '@utils/logger';

export const getContacts = async (req, res) => {
  try {
    const projectId = req.params.id;
    let searchQuery = buildSearchQuery(req.query, { name: 1 });
    let responseData = await getContactSvc(searchQuery, projectId);
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
      name: responseData.name,
      value: responseData.value,
      count: responseData.count,
      errors: [],
    });
  } catch (error) {
    logger.error({
      message: { customMessage: 'Error in getContacts controller', errorMessage: error.message, stack: error.stack },
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
