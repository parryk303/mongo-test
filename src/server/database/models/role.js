import { model, models, Schema } from 'mongoose';

const roleSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const roleModel = models.roles || model('roles', roleSchema);

export default roleModel;
