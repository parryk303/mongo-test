import User from '@models/user';
import { allowedEmail, roles } from '@utils/constants';
import { makeObjectId } from '@utils/utils';
import { validateJobTitleId, validateRoleId, validateUserData } from '@utils/validations';

export const getCurrentUserSvc = async (extensionId) => {
  let user = await User.aggregate([
    {
      $lookup: {
        from: 'roles',
        localField: 'roleId',
        foreignField: '_id',
        as: 'role',
      },
    },
    {
      $lookup: {
        from: 'jobtitles',
        localField: 'jobTitleId',
        foreignField: '_id',
        as: 'jobTitle',
      },
    },
    {
      $match: { extensionId },
    },
  ]);
  return {
    statusCode: 200,
    message: 'Success',
    name: 'user',
    value: user[0],
  };
};

export const createUserSvc = async (userData, currentUserId) => {
  let errors = validateUserData(userData);
  if (errors) {
    return {
      errors,
      message: 'Validation error',
      statusCode: 400,
    };
  }
  userData.email = userData.email.toLowerCase();
  let userAlreadyExists = await User.countDocuments({
    email: userData.email,
    isActive: true,
  });
  if (userAlreadyExists) {
    return {
      message: 'User already exists.',
      statusCode: 400,
    };
  }
  const roleId = makeObjectId(userData.roleId);
  const jobTitleId = makeObjectId(userData.jobTitleId);
  const [role, jobTitle] = await Promise.all([validateRoleId(roleId, true), validateJobTitleId(jobTitleId)]);
  if (userData.email.split('@')[1] != allowedEmail && role.name != roles.CUSTOMER) {
    return {
      message: `Only user with ${allowedEmail} can become Admin/Internal`,
      statusCode: 400,
    };
  }
  if (userData.email.split('@')[1] == allowedEmail && role.name == roles.CUSTOMER) {
    return {
      message: `User with ${allowedEmail} cannot become Customer`,
      statusCode: 400,
    };
  }
  let user = await User.create({
    ...userData,
    roleId,
    jobTitleId,
    createdBy: makeObjectId(currentUserId),
  });
  return {
    message: 'Success',
    statusCode: 200,
    name: 'user',
    value: user,
  };
};

export const getUsersSvc = async ({ where = {}, sort, limit, skip }) => {
  if (where['$and']) {
    where['$and'].push({ isActive: true });
  } else {
    where.isActive = true;
  }
  let aggregateQuery = [
    {
      $lookup: {
        from: 'roles',
        localField: 'roleId',
        foreignField: '_id',
        as: 'role',
      },
    },
    {
      $lookup: {
        from: 'jobTitles',
        localField: 'jobTitleId',
        foreignField: '_id',
        as: 'jobTitle',
      },
    },
    { $unwind: '$jobTitle' },
    { $unwind: '$role' },
    {
      $match: where,
    },
    {
      $sort: sort,
    },
  ];
  if (skip) {
    aggregateQuery.push({ $skip: skip });
  }
  if (limit) {
    aggregateQuery.push({ $limit: limit });
  }
  let users = await User.aggregate(aggregateQuery);
  const count = await User.countDocuments(where);
  return {
    statusCode: 200,
    message: 'Success',
    name: 'users',
    value: users,
    count,
  };
};

export const patchRoleSvc = async (userId, roleId, currentUserId) => {
  if (!userId) {
    return {
      message: 'User id is required.',
      statusCode: 400,
    };
  }
  if (!roleId) {
    return {
      message: 'User id is required.',
      statusCode: 400,
    };
  }
  if (userId == currentUserId) {
    return {
      message: 'Self role cannot be updated.',
      statusCode: 400,
    };
  }
  roleId = makeObjectId(roleId);
  userId = makeObjectId(userId);
  let user = await User.findOne({ _id: userId });
  if (!user) {
    return {
      message: 'User not found.',
      statusCode: 404,
    };
  }
  let role = await validateRoleId(roleId, true);
  if (user.email.split('@')[1] != allowedEmail && role.name != roles.CUSTOMER) {
    return {
      message: `Only user with ${allowedEmail} can become Admin/Internal`,
      statusCode: 400,
    };
  }
  await User.updateOne({ _id: userId }, { $set: { roleId, updatedBy: makeObjectId(currentUserId) } });
  return {
    message: 'Success',
    statusCode: 204,
  };
};

export const deleteUserSvc = async (id, currentUserId, currentUserRole) => {
  if (!id) {
    return {
      message: 'Id is required',
      statusCode: 400,
    };
  }
  if (id == currentUserId) {
    return {
      message: 'Self user cannot be removed.',
      status: 400,
    };
  }
  if (id == currentUserId) {
    return {
      message: 'Self user cannot be deleted.',
      statusCode: 400,
    };
  }
  id = makeObjectId(id);
  currentUserId = makeObjectId(currentUserId);
  let user = await User.aggregate([
    {
      $lookup: {
        from: 'roles',
        localField: 'roleId',
        foreignField: '_id',
        as: 'role',
      },
    },
    {
      $match: { _id: id },
    },
  ]);
  if (!user) {
    return {
      message: 'User not found.',
      statusCode: 404,
    };
  }
  let role = user[0]?.role[0]?.name;
  if (currentUserRole == roles.INTERNAL && role == roles.ADMIN) {
    return {
      message: 'Internal user cannot update admin users',
      statusCode: 400,
    };
  }
  await User.updateOne({ _id: id }, { $set: { isActive: false, updatedBy: currentUserId } });
  return {
    message: 'Success',
    statusCode: 204,
  };
};
