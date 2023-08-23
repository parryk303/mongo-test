import { Project, ProjectRequest, ProjectUpdateControl } from '@models/index';
import { startTransaction, commitTransaction, abortTransaction } from '@utils/mongoose-session';
import { makeObjectId, validateProjectUpdatableFields } from '@utils/utils';
import { validateProjectData } from '@utils/validations';

export const patchProjectRequestSvc = async (id, updatePayload, currentUserId) => {
  if (!id) {
    return {
      message: 'Id is required.',
      statusCode: 400,
    };
  }
  let errors = validateProjectData(updatePayload, true);
  if (errors) {
    return {
      message: 'Validation error',
      statusCode: 400,
      errors,
    };
  }
  currentUserId = makeObjectId(currentUserId);
  id = makeObjectId(id);
  let projectRequest = await ProjectRequest.findOne({ _id: id });
  if (!projectRequest) {
    return {
      message: 'Project request not found.',
      statusCode: 404,
    };
  }
  const projectId = projectRequest.projectId;
  let projectFields = await ProjectUpdateControl.findOne({ projectId });
  if (!projectFields) {
    return {
      message: 'Configure fields to update for this project in database.',
      statusCode: 400,
    };
  }
  let invalidKeys = validateProjectUpdatableFields(updatePayload, projectFields);
  if (invalidKeys) {
    return {
      message: `Cannot update ${invalidKeys.join(',')} fields. Verify configuration.`,
      statusCode: 400,
    };
  }
  const session = await startTransaction();
  try {
    await ProjectRequest.updateOne({ _id: id }, { $set: { updatePayload } }, { session });
    await Project.updateOne({ _id: projectId }, { $set: { updatedBy: currentUserId } }, { session });
    await commitTransaction(session);
    return {
      message: 'Success',
      status: 204,
    };
  } catch (e) {
    await abortTransaction(session);
    return {
      message: e.message,
      statusCode: 500,
    };
  }
};
