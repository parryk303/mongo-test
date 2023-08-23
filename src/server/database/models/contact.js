import { model, models, Schema, SchemaTypes } from 'mongoose';

const contactSchema = new Schema(
  {
    projectId: {
      type: SchemaTypes.ObjectId,
      ref: 'projects',
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    jobTitle: {
      type: String,
      trim: true,
      required: true,
    },
    updatedBy: {
      type: SchemaTypes.ObjectId,
      ref: 'users',
      required: false,
    },
    createdBy: {
      type: SchemaTypes.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const contactModel = models.contacts || model('contacts', contactSchema);

export default contactModel;
