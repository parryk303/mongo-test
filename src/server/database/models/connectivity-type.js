import { model, models, Schema } from 'mongoose';

const connectivityTypeSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const connectivityTypeModel =
  models.connectivityTypes || model('connectivityTypes', connectivityTypeSchema, 'connectivityTypes');

export default connectivityTypeModel;
