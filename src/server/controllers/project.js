import { buildSearchQuery } from '@utils/query-builder';
import { response, sendFailureResponse } from '@utils/utils';
import logger from '@utils/logger';
import {
  getProjectSvc,
  getProjectDetailSvc,
  getProjectFieldsSvc,
  getProjectRequestSvc,
  getProjectRequestByIdSvc,
  getConnectivityDetailSvc,
  createProjectSvc,
  updateProjectDetailsSvc,
  patchProjectRequestStatusSvc,
  patchProjectRequestSvc,
} from '@services/project-service';

export const createProjects = async (req, res) => {
  try {
    const { rcAccountId: currentUserRCAccountId, userId: currentUserId } = req.userData;
    const { body: projectData } = req;
    let responseData = await createProjectSvc(projectData, currentUserRCAccountId, currentUserId);
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
      name: responseData.name,
      value: responseData.value,
      count: responseData.count,
      errors: responseData.errors || [],
    });
  } catch (error) {
    logger.error({
      message: { customMessage: 'Error in createProjects controller', errorMessage: error.message, stack: error.stack },
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

export const getProjects = async (req, res) => {
  try {
    const { rcAccountId: currentUserAccountId, role } = req.userData;
    let searchQuery = buildSearchQuery(req.query, { createdAt: -1 });
    let responseData = await getProjectSvc(searchQuery, currentUserAccountId, role);
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
      name: responseData.name,
      value: responseData.value,
      count: responseData.count,
      errors: responseData.errors || [],
    });
  } catch (error) {
    logger.error({
      message: { customMessage: 'Error in getProjects controller', errorMessage: error.message, stack: error.stack },
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

export const getProjectDetails = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { rcAccountId: currentUserAccountId, role } = req.userData;
    let responseData = await getProjectDetailSvc(projectId, currentUserAccountId, role);
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
      name: responseData.name,
      value: responseData.value,
      count: responseData.count,
      errors: responseData.errors || [],
    });
  } catch (error) {
    logger.error({
      message: {
        customMessage: 'Error in getProjectDetails controller',
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

export const getConnectivityDetails = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { rcAccountId: currentUserAccountId, role } = req.userData;
    let responseData = await getConnectivityDetailSvc(projectId, currentUserAccountId, role);
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
      name: responseData.name,
      value: responseData.value,
      count: responseData.count,
      errors: responseData.errors || [],
    });
  } catch (error) {
    logger.error({
      message: {
        customMessage: 'Error in getConnectivityDetails controller',
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

export const getProjectFields = async (req, res) => {
  try {
    const projectId = req.params.id;
    let responseData = await getProjectFieldsSvc(projectId);
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
      name: responseData.name,
      value: responseData.value,
      count: responseData.count,
      errors: responseData.errors || [],
    });
  } catch (error) {
    logger.error({
      message: {
        customMessage: 'Error in getProjectFields controller',
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

export const updateProjectDetails = async (req, res) => {
  try {
    const currentUserAccountId = req.userData.rcAccountId;
    const currentUserId = req.params.userId;
    const projectId = req.params.id;
    const type = req.params.type;
    const currentUserRole = req.userData.role;
    let responseData = await updateProjectDetailsSvc(
      req.body,
      type,
      projectId,
      currentUserAccountId,
      currentUserId,
      currentUserRole
    );
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
      name: responseData.name,
      value: responseData.value,
      count: responseData.count,
      errors: responseData.errors || [],
    });
  } catch (error) {
    logger.error({
      message: {
        customMessage: 'Error in updateProjectDetails controller',
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

export const patchProjectRequestStatus = async (req, res) => {
  try {
    const currentUserId = req.params.userId;
    const id = req.params.id;
    let responseData = await patchProjectRequestStatusSvc(id, req.body, currentUserId);
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
      errors: responseData.errors || [],
    });
  } catch (error) {
    logger.error({
      message: {
        customMessage: 'Error in patchProjectRequestStatus controller',
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

export const patchProjectRequest = async (req, res) => {
  try {
    const currentUserId = req.params.userId;
    const id = req.params.id;
    let responseData = await patchProjectRequestSvc(id, req.body, currentUserId);
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
      errors: responseData.errors || [],
    });
  } catch (error) {
    logger.error({
      message: {
        customMessage: 'Error in patchProjectRequest controller',
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

export const getProjectRequest = async (req, res) => {
  try {
    let searchQuery = buildSearchQuery(req.query, { createdAt: -1 });
    const { rcAccountId: currentUserAccountId, role } = req.userData;
    let responseData = await getProjectRequestSvc(searchQuery, currentUserAccountId, role);
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
      name: responseData.name,
      value: responseData.value,
      count: responseData.count,
      errors: responseData.errors || [],
    });
  } catch (error) {
    logger.error({
      message: {
        customMessage: 'Error in getProjectRequest controller',
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

export const getProjectRequestById = async (req, res) => {
  try {
    let requestId = req.params.id;
    const { rcAccountId: currentUserAccountId, role } = req.userData;
    let responseData = await getProjectRequestByIdSvc(requestId, currentUserAccountId, role);
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
      name: responseData.name,
      value: responseData.value,
      count: responseData.count,
      errors: responseData.errors || [],
    });
  } catch (error) {
    logger.error({
      message: {
        customMessage: 'Error in getProjectRequestById controller',
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
