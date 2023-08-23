import logger from '@utils/logger';

import User from '@models/user';
import Role from '@models/role';
import JobTitle from '@models/job-title';
import ConnectivityType from '@models/connectivity-type';
import { asyncForEach } from '@utils/utils';

export default async function seedMigration() {
  logger.info({ message: 'Database seed start.' });
  try {
    const roles = await insertRoles();
    const jobTitles = await insertJobTitles();
    await addConnectivityTypes();

    const roleId = roles.find((e) => e.name == 'Admin')._id;
    const jobTitleId = jobTitles.find((e) => e.alias == 'PM')._id;
    let users = await createUsers(roleId, jobTitleId);
    await updateCreatedBy(users);
    logger.info({ message: 'Database seed completed.' });
  } catch (err) {
    logger.error({
      message: { customMessage: 'Error in Database seed', errorMessage: err.message, stack: err.stack },
    });
    throw err;
  }
}

const insertRoles = async () => {
  return await Role.insertMany([
    {
      name: 'Admin',
      description: 'admin',
    },
    { name: 'Internal', description: 'internal' },
    { name: 'Customer', description: 'customer' },
  ]);
};
const insertJobTitles = async () => {
  return await JobTitle.insertMany([
    {
      name: 'Project Manager',
      description: 'project manager',
      alias: 'PM',
    },
    {
      name: 'Implementation Manager',
      description: 'implementation manager',
      alias: 'IM',
    },
    {
      name: 'Client Partner',
      description: 'client partner',
      alias: 'CP',
    },
  ]);
};
const createUsers = async (roleId, jobTitleId) => {
  return await User.insertMany([
    {
      firstName: 'Sage',
      lastName: 'Arslan',
      extensionId: '62904886028',
      rcAccountId: '62904886028',
      roleId,
      email: 'sage.arslan@gmail.com',
      jobTitleId,
      companyName: 'Ringcentral',
    },
  ]);
};

const updateCreatedBy = async (users) => {
  await asyncForEach(users, async (user) => {
    await User.updateOne({ _id: user._id }, { $set: { createdBy: user._id } });
  });
};

const addConnectivityTypes = async () => {
  return await ConnectivityType.insertMany([
    {
      name: 'VPN',
    },
    {
      name: 'Public IP',
    },
    {
      name: 'VPC Peering',
    },
    {
      name: 'Other',
    },
  ]);
};
