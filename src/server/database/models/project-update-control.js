import { model, models, Schema, SchemaTypes } from 'mongoose';

const projectUpdateControlSchema = new Schema(
  {
    projectId: {
      type: SchemaTypes.ObjectId,
      ref: 'projects',
      required: true,
    },
    description: {
      type: Boolean,
    },
    siteToSiteVPN: {
      type: Boolean,
    },
    devTestEndpoint: {
      type: Boolean,
    },
    productionEndpoint: {
      type: Boolean,
    },
    applicationCredentials: {
      type: Boolean,
    },
    requestedBuildDate: {
      type: Boolean,
    },
    buildDate: {
      type: Boolean,
    },
    uatStartDate: {
      type: Boolean,
    },
    uatEndDate: {
      type: Boolean,
    },
    expiringDate: {
      type: Boolean,
    },
    renewalDate: {
      type: Boolean,
    },
    crIdentifier: {
      type: Boolean,
    },
    awsRegionMain: {
      type: Boolean,
    },
    awsRegionBackup: {
      type: Boolean,
    },
    crEndpointMain: {
      type: Boolean,
    },
    crEndpointBackup: {
      type: Boolean,
    },
    messageTransformation: {
      type: Boolean,
    },
    messageCertificate: {
      type: Boolean,
    },
    connectivityType: {
      type: Boolean,
    },
    mainPublicIps: {
      type: Boolean,
    },
    backupVPNPeers: {
      type: Boolean,
    },
    internalNetworkCIDR: {
      type: Boolean,
    },
    customerVPNGatewayMakeModel: {
      type: Boolean,
    },
    vpnGatewaySoftwareVersion: {
      type: Boolean,
    },
    routingMethods: {
      type: Boolean,
    },
    desiredRCsideCIDRs: {
      type: Boolean,
    },
    customerVPNPeerIps: {
      type: Boolean,
    },
    vpnAuthentication: {
      type: Boolean,
    },
    preferredFileExchangeMethod: {
      type: Boolean,
    },
    ikeVersion: {
      type: Boolean,
    },
    phase1EncryptionAlgorithm: {
      type: Boolean,
    },
    phase1IntegrityAlgorithm: {
      type: Boolean,
    },
    phase1DiffleHellmanAlgorithm: {
      type: Boolean,
    },
    phase1Lifetime: {
      type: Boolean,
    },
    phase2EncryptionAlgorithm: {
      type: Boolean,
    },
    phase2IntegrityAlgorithm: {
      type: Boolean,
    },
    phase2DiffleHellmanAlgorithm: {
      type: Boolean,
    },
    phase2Lifetime: {
      type: Boolean,
    },
    deadPeerDetectionTimeout: {
      type: Boolean,
    },
    rekeyMarginTime: {
      type: Boolean,
    },
    rekeyFuzz: {
      type: Boolean,
    },
    replayWindowSize: {
      type: Boolean,
    },
  },
  { timestamps: true, versionKey: false }
);

const projectUpdateControlModel =
  models.projectUpdateControls || model('projectUpdateControls', projectUpdateControlSchema, 'projectUpdateControls');

export default projectUpdateControlModel;
