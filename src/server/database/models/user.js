import { model, models, Schema, SchemaTypes } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    extensionId: {
      type: String,
      trim: true,
    },
    rcAccountId: {
      type: String,
      trim: true,
    },
    roleId: {
      type: SchemaTypes.ObjectId,
      ref: 'roles',
      required: true,
    },
    jobTitleId: {
      type: SchemaTypes.ObjectId,
      ref: 'jobTitles',
      required: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    lastLoginAt: {
      type: Date,
    },
    updatedBy: {
      type: SchemaTypes.ObjectId,
      ref: 'users',
      required: false,
    },
    createdBy: {
      type: SchemaTypes.ObjectId,
      ref: 'users',
      required: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const userModel = models.users || model('users', userSchema);

export default userModel;
