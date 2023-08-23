import { model, models, Schema, SchemaTypes } from 'mongoose';

const jobTitleSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    alias: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const jobTitleModel = models.jobTitles || model('jobTitles', jobTitleSchema, 'jobTitles');

export default jobTitleModel;
