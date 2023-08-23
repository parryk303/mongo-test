import { Project, ProjectRequest, ProjectDetail, ConnectivityDetail } from '@models/index';
import { roles } from '@utils/constants';
import { makeObjectId } from '@utils/utils';

export const getProjectRequestSvc = async ({ where = {}, sort, limit = 0, skip = 0 }, currentUserAccountId, role) => {
  let aggregate = [];
  if (role === roles.CUSTOMER) {
    let projectIds = (await Project.find({ rcAccountId: currentUserAccountId }, { _id: 1 })).map((e) => e._id);
    where['projectId'] = { $in: projectIds };
    aggregate = projectRequestQueryForCustomer(where);
  }
  if (where && role !== roles.CUSTOMER) {
    aggregate.push({ $match: where });
  }
  if (sort) {
    aggregate.push({ $sort: sort });
  }
  if (skip) {
    aggregate.push({ $skip: skip });
  }
  if (limit) {
    aggregate.push({ $limit: limit });
  }
  let projectRequests = await ProjectRequest.aggregate(aggregate);
  return {
    statusCode: 200,
    message: 'Success',
    name: 'projectRequests',
    value: projectRequests,
  };
};

const projectRequestQueryForCustomer = (where) => {
  let selectedFields = {
    _id: 0,
    createdBy: 1,
    status: 1,
    requestType: 1,
    description: 1,
  };
  let aggregate = [
    {
      $lookup: {
        from: 'projects',
        localField: 'projectId',
        foreignField: '_id',
        as: 'project',
      },
    },
    { $match: where ? where : {} },
    {
      $project: selectedFields,
    },
  ];
  return aggregate;
};

export const getProjectRequestByIdSvc = async (requestId, currentUserAccountId, role) => {
  if (!requestId) {
    return {
      message: 'project request id is required.',
      statusCode: 400,
    };
  }

  const projectRequest = await ProjectRequest.findById(makeObjectId(requestId)).populate('projectId');
  if (!projectRequest) {
    return {
      message: 'project request details not found.',
      statusCode: 404,
    };
  }
  const projectId = projectRequest.projectId;

  const projectDetailsPromise = ProjectDetail.findOne({ projectId });
  const connectivityDetailsPromise = ConnectivityDetail.findOne({ projectId });
  try {
    const [projectDetails, connectivityDetails] = await Promise.all([
      projectDetailsPromise,
      connectivityDetailsPromise,
    ]);
    return {
      statusCode: 200,
      message: 'Success',
      name: 'projectData',
      value: { projectRequest, projectDetails, connectivityDetails },
    };
  } catch (err) {
    throw err;
  }
};
