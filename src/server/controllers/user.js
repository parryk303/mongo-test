import { getCurrentUserSvc, getUsersSvc, createUserSvc, patchRoleSvc, deleteUserSvc } from '@services/user';
import { response, sendFailureResponse } from '@utils/utils';
import logger from '@utils/logger';
import { buildSearchQuery } from '@utils/query-builder';

export const getCurrentUser = async (req, res) => {
  try {
    const extensionId = req.userData.extensionId;
    let responseData = await getCurrentUserSvc(extensionId);
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
      message: { customMessage: 'Error in getCurrentUser controller', errorMessage: error.message, stack: error.stack },
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

export const createUser = async (req, res) => {
  try {
    const currentUserId = req.userData.userId;
    let responseData = await createUserSvc(req.body, currentUserId);
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
      name: responseData.name,
      value: responseData.value,
      errors: responseData.errors,
    });
  } catch (error) {
    logger.error({
      message: { customMessage: 'Error in createUser controller', errorMessage: error.message, stack: error.stack },
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

export const getUsers = async (req, res) => {
  try {
    let searchQuery = buildSearchQuery(req.query, { createdAt: -1 });
    let responseData = await getUsersSvc(searchQuery);
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
      name: responseData.name,
      value: responseData.value,
      errors: responseData.errors,
      count: responseData.count,
    });
  } catch (error) {
    logger.error({
      message: { customMessage: 'Error in getUsers controller', errorMessage: error.message, stack: error.stack },
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

export const patchRole = async (req, res) => {
  try {
    const currentUserId = req.userData.userId;
    let { userId, roleId } = req.params;
    let responseData = await patchRoleSvc(userId, roleId, currentUserId);
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
      name: responseData.name,
      value: responseData.value,
      errors: responseData.errors,
    });
  } catch (error) {
    logger.error({
      message: { customMessage: 'Error in patchRole controller', errorMessage: error.message, stack: error.stack },
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

export const deleteUser = async (req, res) => {
  try {
    const currentUserId = req.userData.userId;
    let id = req.params.id;
    let role = req.userData.role;
    let responseData = await deleteUserSvc(id, currentUserId, role);
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
      errors: responseData.errors || [],
    });
  } catch (error) {
    logger.error({
      message: { customMessage: 'Error in deleteUser controller', errorMessage: error.message, stack: error.stack },
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
