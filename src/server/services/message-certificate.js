import MessageCertificate from '@models/message-certificate';
import { makeObjectId } from '@utils/utils';
import { getSignedUrl, deleteFileFromS3, uploadFileToS3 } from './aws-s3';
import { abortTransaction, commitTransaction, startTransaction } from '@utils/mongoose-session';

export const getMessageCertificateSvc = async (id) => {
  if (!id) {
    return {
      message: 'Id is required',
      statusCode: 400,
    };
  }
  id = makeObjectId(id);
  let msgCertificate = await MessageCertificate.findOne({ _id: id });
  if (!msgCertificate) {
    return {
      message: 'msgCertificate not found',
      statusCode: 404,
    };
  }
  let key = msgCertificate.certificate.s3key;
  msgCertificate.certificate.signedUrl = getSignedUrl(key);
  return {
    message: 'Success',
    statusCode: 200,
    name: 'msgCertificate',
    value: msgCertificate,
  };
};

export const uploadMessageCertificateSvc = async (file, { type, passphrase }) => {
  const fileExt = file?.originalname?.split('.')[1];
  const fileName = file?.originalname?.split('.')[0]?.replace(/[()\s]/g, '');
  const key = `${fileName}-${Date.now()}.${fileExt}`;
  let params = {
    Bucket: process.env.CERTIFICATE_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
  };
  let { Location } = await uploadFileToS3(params);
  let messageCertificate = await MessageCertificate.create({
    certificate: {
      type,
      path: Location,
      s3key: key,
      passphrase,
    },
  });
  return {
    message: 'Success',
    statusCode: 200,
    name: 'messageCertificateId',
    value: messageCertificate._id,
  };
};

export const deleteMessageCertificateSvc = async (id) => {
  if (!id) {
    return {
      message: 'Id is required',
      statusCode: 400,
    };
  }
  id = makeObjectId(id);
  let msgCertificate = await MessageCertificate.findOne({ _id: id });
  if (!msgCertificate) {
    return {
      message: 'msgCertificate not found',
      statusCode: 404,
    };
  }
  const session = await startTransaction();
  try {
    await MessageCertificate.deleteOne({ _id: id }, { session });
    const params = {
      Bucket: process.env.CERTIFICATE_BUCKET_NAME,
      Key: msgCertificate.certificate.s3key,
    };
    await deleteFileFromS3(params);
    await commitTransaction(session);
    return {
      message: 'Success',
      statusCode: 204,
    };
  } catch (e) {
    await abortTransaction(session);
    return {
      message: e.message || 'internal server error',
      statusCode: 500,
    };
  }
};
