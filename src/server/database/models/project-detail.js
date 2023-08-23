import { model, models, Schema, SchemaTypes } from 'mongoose';

const projectDetailSchema = new Schema(
  {
    projectId: {
      type: SchemaTypes.ObjectId,
      ref: 'projects',
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    siteToSiteVPN: {
      type: Boolean,
    },
    devTestEndpoint: {
      type: Array,
    },
    productionEndpoint: {
      type: Array,
    },
    applicationCredentials: {
      type: String,
      trim: true,
    },
    requestedBuildDate: {
      type: Date,
    },
    buildDate: {
      type: Date,
    },
    uatStartDate: {
      type: Date,
    },
    uatEndDate: {
      type: Date,
    },
    expiringDate: {
      type: Date,
    },
    renewalDate: {
      type: Date,
    },
    crIdentifier: {
      type: String,
      trim: true,
    },
    awsRegionMain: {
      type: String,
      trim: true,
    },
    awsRegionBackup: {
      type: String,
      trim: true,
    },
    crEndpointMain: {
      type: String,
      trim: true,
    },
    crEndpointBackup: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const projectDetailModel = models.projectDetails || model('projectDetails', projectDetailSchema, 'projectDetails');

export default projectDetailModel;
