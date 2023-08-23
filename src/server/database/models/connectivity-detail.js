import { model, models, Schema, SchemaTypes } from 'mongoose';

const connectivityDetailSchema = new Schema(
  {
    projectId: {
      type: SchemaTypes.ObjectId,
      ref: 'projects',
      required: true,
    },
    messageTransformation: {
      type: String,
      trim: true,
      required: true,
    },
    messageCertificate: {
      type: Boolean,
      required: true,
    },
    connectivityType: {
      type: String,
      trim: true,
    },
    mainPublicIps: {
      type: Array,
    },
    backupVPNPeers: {
      type: Array,
    },
    internalNetworkCIDR: {
      type: String,
      trim: true,
    },
    customerVPNGatewayMakeModel: {
      type: String,
      trim: true,
    },
    vpnGatewaySoftwareVersion: {
      type: String,
      trim: true,
    },
    routingMethods: {
      type: String,
      trim: true,
    },
    desiredRCsideCIDRs: {
      type: Array,
    },
    customerVPNPeerIps: {
      type: Array,
    },
    vpnAuthentication: {
      type: Array,
    },
    preferredFileExchangeMethod: {
      type: String,
      trim: true,
    },
    ikeVersion: {
      type: String,
      trim: true,
    },
    phase1EncryptionAlgorithm: {
      type: String,
      trim: true,
    },
    phase1IntegrityAlgorithm: {
      type: String,
      trim: true,
    },
    phase1DiffleHellmanAlgorithm: {
      type: String,
      trim: true,
    },
    phase1Lifetime: {
      type: String,
      trim: true,
    },
    phase2EncryptionAlgorithm: {
      type: String,
      trim: true,
    },
    phase2IntegrityAlgorithm: {
      type: String,
      trim: true,
    },
    phase2DiffleHellmanAlgorithm: {
      type: String,
      trim: true,
    },
    phase2Lifetime: {
      type: String,
      trim: true,
    },
    deadPeerDetectionTimeout: {
      type: String,
      trim: true,
    },
    rekeyMarginTime: {
      type: String,
      trim: true,
    },
    rekeyFuzz: {
      type: String,
      trim: true,
    },
    replayWindowSize: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const connectivityDetailModel =
  models.connectivityDetails || model('connectivityDetails', connectivityDetailSchema, 'connectivityDetails');

export default connectivityDetailModel;
