import { Project, ProjectUpdateControl } from '@models/index';
import { roles } from '@utils/constants';
import { makeObjectId } from '@utils/utils';

export const getProjectSvc = async ({ where = {}, sort, limit = 0, skip = 0 }, currentUserAccountId, role) => {
  if (where._id) {
    where._id = makeObjectId(where._id);
  }
  let selectedFields = null;
  if (role == roles.CUSTOMER) {
    where.rcAccountId = currentUserAccountId;
    selectedFields = {
      _id: 1,
      projectName: 1,
      projectStatus: 1,
      'contacts.name': 1,
      'contacts.jobTitle': 1,
    };
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
      $match: where,
    },
    { $sort: sort },
  ];
  if (skip) {
    aggregate.push({ $skip: skip });
  }
  if (limit) {
    aggregate.push({ $limit: limit });
  }
  if (selectedFields) {
    aggregate.push({ $project: selectedFields });
  }
  let projects = await Project.aggregate(aggregate);
  const count = await Project.countDocuments(where);
  return {
    statusCode: 200,
    message: 'Success',
    name: 'projects',
    value: projects,
    count,
  };
};

export const getProjectFieldsSvc = async (projectId) => {
  if (!projectId) {
    return {
      message: 'Project id is required',
      statusCode: 400,
    };
  }
  projectId = makeObjectId(projectId);
  let isProjectExists = await Project.countDocuments({ _id: projectId });
  if (!isProjectExists) {
    return {
      message: 'Project not found',
      statusCode: 404,
    };
  }
  let projectFields = await ProjectUpdateControl.findOne({ projectId });
  return {
    message: 'Success',
    statusCode: 200,
    name: 'projectFields',
    value: projectFields,
  };
};
