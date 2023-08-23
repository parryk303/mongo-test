import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
});

export default AWS;
