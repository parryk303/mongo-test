import { Project } from '@models/index';
import { makeObjectId } from '@utils/utils';
import { getSignedUrl, uploadFileToS3 } from './aws-s3';

export const getSowSvc = async (projectId) => {
  if (!projectId) {
    return {
      message: 'Project id is required',
      statusCode: 400,
    };
  }
  projectId = makeObjectId(projectId);
  let project = await Project.findOne({ _id: projectId });
  if (!project) {
    return {
      message: 'Project not found',
      statusCode: 404,
    };
  }
  if (!project.sow) {
    return {
      message: 'Sow not found.',
      statusCode: 404,
    };
  }
  let sow = project.sow;
  if (project.sow.includes('.s3.')) {
    let key = project.sow.split('.amazonaws.com/')[1];
    sow = getSignedUrl(key);
  }
  return {
    message: 'Success',
    statusCode: 200,
    name: 'sow',
    value: sow,
  };
};

export const uploadSowSvc = async (file) => {
  if (!file) {
    return {
      message: 'File is required.',
      statusCode: 400,
    };
  }
  const fileExt = file?.originalname?.split('.')[1];
  const fileName = file?.originalname?.split('.')[0]?.replace(/[()\s]/g, '');
  let params = {
    Bucket: process.env.SOW_BUCKET_NAME,
    Key: `${fileName}-${Date.now()}.${fileExt}`,
    Body: file.buffer,
  };
  let { Location } = await uploadFileToS3(params);
  return {
    name: 'sow',
    value: Location,
    message: 'success',
    statusCode: 200,
  };
};
