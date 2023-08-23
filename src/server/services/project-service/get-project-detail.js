import { Project } from '@models/index';
import { roles } from '@utils/constants';
import { makeObjectId } from '@utils/utils';

export const getProjectDetailSvc = async (projectId, currentUserAccountId, role) => {
  if (!projectId) {
    return {
      message: 'project id is required.',
      statusCode: 400,
    };
  }
  let where = {};
  where._id = makeObjectId(projectId);

  const count = await Project.countDocuments(where);
  if (count == 0) {
    return {
      message: 'project not found.',
      statusCode: 404,
    };
  }

  if (role == roles.CUSTOMER) {
    where.rcAccountId = currentUserAccountId;
  }
  let aggregate = [
    {
      $lookup: {
        from: 'contacts',
        localField: '_id',
        foreignField: 'projectId',
        as: 'contacts',
      },
    },
    {
      $lookup: {
        from: 'projectDetails',
        localField: '_id',
        foreignField: 'projectId',
        as: 'projectDetails',
      },
    },
    {
      $match: where,
    },
  ];
  let projects = await Project.aggregate(aggregate);

  return {
    statusCode: 200,
    message: 'Success',
    name: 'projects',
    value: projects,
    count,
  };
};
