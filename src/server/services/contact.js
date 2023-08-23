import Contact from '@models/contact';
import Project from '@models/project';
import { makeObjectId } from '@utils/utils';

export const getContactSvc = async ({ where = {}, sort, limit, skip }, projectId) => {
  if (!projectId) {
    return {
      message: 'Project id is required.',
      statusCode: 400,
    };
  }
  projectId = makeObjectId(projectId);
  let project = await Project.countDocuments({ _id: projectId });
  if (!project) {
    return {
      message: 'Project not found.',
      statusCode: 404,
    };
  }
  if (!where['$and']) {
    where['$and'] = [];
  }
  where['$and'].push({ projectId });
  let contacts = await Contact.find(where, null, { sort, limit, skip });
  const count = await Contact.countDocuments(where);
  return {
    statusCode: 200,
    message: 'Success',
    name: 'contacts',
    value: contacts,
    count,
  };
};
