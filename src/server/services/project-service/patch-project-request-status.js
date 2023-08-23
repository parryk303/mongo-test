import { ConnectivityDetail, Project, ProjectDetail, ProjectRequest } from '@models/index';
import { projectRequestStatus, projectStatus, projectUpdateTypes } from '@utils/constants';
import { makeObjectId } from '@utils/utils';
import { abortTransaction, startTransaction, commitTransaction } from '@utils/mongoose-session';

export const patchProjectRequestStatusSvc = async (id, { status }, currentuserId) => {
  if (!id) {
    return {
      message: 'Id is required.',
      statusCode: 400,
    };
  }
  if (!status) {
    return {
      message: 'status is required.',
      statusCode: 400,
    };
  }
  if (![projectRequestStatus.REJECTED, projectRequestStatus.APPROVED].includes(status)) {
    return {
      message: `Invalid status, one of ${[projectRequestStatus.REJECTED, projectRequestStatus.APPROVED].join(
        ','
      )} is expected`,
      statusCode: 400,
    };
  }
  id = makeObjectId(id);
  let projectRequest = await ProjectRequest.findOne({ _id: id });
  if (!projectRequest) {
    return {
      message: 'Project request not found.',
      statusCode: 404,
    };
  }
  if (projectRequest.status != projectRequestStatus.PENDING) {
    return {
      message: `project request is already ${projectRequest.status}`,
      statusCode: 400,
    };
  }
  currentuserId = makeObjectId(currentuserId);
  const session = await startTransaction();
  try {
    let updateProjectPayload = null;
    await ProjectRequest.updateOne({ _id: id }, { $set: { status, approvedBy: currentuserId } }, { session });
    if (status == projectRequestStatus.APPROVED) {
      projectRequest.requestType == projectUpdateTypes.DETAILS
        ? await ProjectDetail.updateOne(
            { projectId: projectRequest.projectId },
            { $set: projectRequest.updatePayload },
            {
              session,
            }
          )
        : await ConnectivityDetail.updateOne(
            { projectId: projectRequest.projectId },
            { $set: projectRequest.updatePayload },
            {
              session,
            }
          );
      updateProjectPayload = {
        updatedBy: currentuserId,
      };
    }
    let allRequests = await ProjectRequest.find({
      projectId: projectRequest.projectId,
    });
    allRequests.find((r) => r._id == id).status = status;
    if (allRequests.every((r) => [projectRequestStatus.APPROVED, projectRequestStatus.REJECTED].includes(r.status))) {
      updateProjectPayload.projectStatus = projectStatus.DEPLOYED;
    }
    if (updateProjectPayload) {
      await Project.updateOne(
        { _id: projectRequest.projectId },
        { $set: { projectStatus: projectStatus.DEPLOYED, updatedBy: currentuserId } },
        { session }
      );
    }
    await commitTransaction(session);
    return {
      message: 'Success',
      statusCode: 204,
    };
  } catch (e) {
    await abortTransaction(session);
    throw {
      message: e.message,
      statusCode: 500,
    };
  }
};
