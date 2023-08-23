import AWS from '@utils/aws-config';
import { PRESIGNED_SOW_EXPIRES_IN } from '@utils/constants';

let s3 = new AWS.S3();

export const uploadFileToS3 = async (params) => {
  return await s3.upload(params).promise();
};

export const getSignedUrl = (key) => {
  return s3.getSignedUrl('getObject', {
    Bucket: process.env.SOW_BUCKET_NAME,
    Key: key,
    Expires: PRESIGNED_SOW_EXPIRES_IN,
  });
};

export const deleteFileFromS3 = async (params) => {
  return await s3.deleteObject(params).promise();
};
