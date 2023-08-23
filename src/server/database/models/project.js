import { model, models, Schema, SchemaTypes } from 'mongoose';

const projectSchema = new Schema(
  {
    rcAccountId: {
      type: String,
      trim: true,
      required: true,
    },
    customerName: {
      type: String,
      trim: true,
      required: true,
    },
    customerContactName: {
      type: String,
      trim: true,
      required: true,
    },
    customerContactEmail: {
      type: String,
      trim: true,
      required: true,
    },
    projectName: {
      type: String,
      trim: true,
      required: true,
    },
    projectStatus: {
      type: String,
      trim: true,
      required: true,
    },
    sow: {
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

const projectModel = models.projects || model('projects', projectSchema);

export default projectModel;
