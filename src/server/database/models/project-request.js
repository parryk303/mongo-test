import { model, models, Schema, SchemaTypes } from 'mongoose';

const projectRequestSchema = new Schema(
  {
    projectId: {
      type: SchemaTypes.ObjectId,
      ref: 'projects',
      required: true,
    },
    requestType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    approvedBy: {
      type: SchemaTypes.ObjectId,
      ref: 'users',
      required: false,
    },
    createdBy: {
      type: SchemaTypes.ObjectId,
      ref: 'users',
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    updatePayload: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const projectRequestModel = models.projectRequests || model('projectRequests', projectRequestSchema, 'projectRequests');

export default projectRequestModel;
