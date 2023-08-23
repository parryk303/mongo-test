import { Project, ProjectRequest, ProjectUpdateControl } from '@models/index';
import { abortTransaction, commitTransaction, startTransaction } from '@utils/mongoose-session';
import { makeObjectId, validateProjectUpdatableFields } from '@utils/utils';
import { validateProjectData } from '@utils/validations';

const { projectUpdateTypes, roles, projectRequestStatus, projectStatus } = require('@utils/constants');

export const updateProjectDetailsSvc = async (
  projectData,
  type,
  projectId,
  currentUserAccountId,
  currentUserId,
  currentUserRole
) => {
  if (!projectId) {
    return {
      message: 'project id is required.',
      statusCode: 400,
    };
  }
  if (Object.values(projectUpdateTypes).includes(type)) {
    return {
      message: `type is invalid, one of ${Object.values(projectUpdateTypes).join(',')} is expected`,
      statusCode: 400,
    };
  }
  let errors = validateProjectData(projectData, true);
  if (errors) {
    return {
      message: 'Validation error',
      statusCode: 400,
      errors,
    };
  }
  projectId = makeObjectId(projectId);
  let findProjectWhere = {
    _id: projectId,
  };
  if (currentUserRole == roles.CUSTOMER) {
    findProjectWhere.rcAccountId = currentUserAccountId;
  }
  let isProjectExists = await Project.countDocuments(findProjectWhere);
  if (!isProjectExists) {
    return {
      message: 'project not found.',
      statusCode: 404,
    };
  }
  let projectFields = await ProjectUpdateControl.findOne({ projectId });
  if (!projectFields) {
    return {
      message: 'Configure fields to update for this project in database.',
      statusCode: 400,
    };
  }
  let invalidKeys = validateProjectUpdatableFields(projectData, projectFields);
  if (invalidKeys) {
    return {
      message: `Cannot update ${invalidKeys.join(',')} fields. Verify configuration.`,
      statusCode: 400,
    };
  }
  const session = await startTransaction();
  try {
    let projectRequest = await ProjectRequest.create(
      [
        {
          updatePayload: projectData,
          description: projectData.description,
          projectId,
          requestType: type,
          createdBy: makeObjectId(currentUserId),
          status: projectRequestStatus.PENDING,
        },
      ],
      { session }
    );
    await Project.updateOne({ _id: projectId }, { $set: { projectStatus: projectStatus.PENDING } }, { session });
    await commitTransaction(session);
    return {
      message: 'Success',
      status: 200,
      name: 'projectRequest',
      value: projectRequest[0],
    };
  } catch (e) {
    await abortTransaction(session);
    return {
      message: e.message,
      statusCode: 500,
    };
  }
};
