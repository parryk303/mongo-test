import { model, models, Schema, SchemaTypes } from 'mongoose';

const messageCertificateSchema = new Schema(
  {
    projectId: {
      type: SchemaTypes.ObjectId,
      ref: 'projects',
    },
    certificate: {
      type: JSON,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const messageCertificateModel =
  models.messageCertificates || model('messageCertificates', messageCertificateSchema, 'messageCertificates');

export default messageCertificateModel;
