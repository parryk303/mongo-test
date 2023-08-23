import { Role, JobTitle } from '@models/index';

export const getRolesSvc = async () => {
  let roles = await Role.find();
  return {
    message: 'Success',
    statusCode: 200,
    name: 'roles',
    value: roles,
  };
};

export const getJobTitlesSvc = async () => {
  let jobTitles = await JobTitle.find();
  return {
    message: 'Success',
    statusCode: 200,
    name: 'jobTitles',
    value: jobTitles,
  };
};
