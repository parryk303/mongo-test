import { ConnectivityDetail, Project, ProjectDetail, MessageCertificate } from '@models/index';
import logger from '@utils/logger';
import { makeObjectId } from '@utils/utils';
import { projectStatus } from '@utils/constants';
import { validateProjectData, validateMessageCertificates } from '@utils/validations';
import { abortTransaction, commitTransaction, startTransaction } from '@utils/mongoose-session';

export const createProjectSvc = async (projectData, currentUserRCAccountId, currentUserId) => {
  let errors = validateProjectData(projectData);
  if (errors) {
    return {
      errors,
      message: 'Validation error',
      statusCode: 400,
    };
  }
  let projectAlreadyExists = await Project.countDocuments({
    customerName: projectData.customerName,
    projectName: projectData.projectName,
  });
  if (projectAlreadyExists) {
    return {
      message: 'Project already exists.',
      statusCode: 400,
    };
  }
  if (projectData.messageCertificate) {
    projectData.messageCertificateIds = projectData.messageCertificateIds.map((id) => makeObjectId(id));
    await validateMessageCertificates(projectData.messageCertificateIds);
  }
  const session = await startTransaction();
  try {
    let createdBy = makeObjectId(currentUserId);
    let project = await createProject(projectData, session, createdBy);
    const projectId = project[0]._id;
    await Promise.all([
      createProjectDetail(projectId, projectData, session),
      createConnectivityDetail(projectId, projectData, session),
      updateMessageCertificates(projectId, projectData, session),
    ]);
    await commitTransaction(session);
    logger.info({ message: 'Project created successfully' });
    return {
      statusCode: 200,
      message: 'Success',
      name: 'project',
      value: project,
    };
  } catch (error) {
    await abortTransaction(session);
    return {
      message: error.message || 'Internal server error',
      statusCode: 500,
    };
  }
};

const createProjectDetail = async (projectId, projectData, session) => {
  const newProjectDetail = {
    projectId: projectId,
    description: projectData.description,
    siteToSiteVPN: projectData.siteToSiteVPN,
    devTestEndpoint: projectData.devTestEndpoint,
    productionEndpoint: projectData.productionEndpoint,
    applicationCredentials: projectData.applicationCredentials,
    requestedBuildDate: projectData.requestedBuildDate,
    buildDate: projectData.buildDate,
    uatStartDate: projectData.uatStartDate,
    uatEndDate: projectData.uatEndDate,
    expiringDate: projectData.expiringDate,
    renewalDate: projectData.renewalDate,
    crIdentifier: projectData.crIdentifier,
    awsRegionMain: projectData.awsRegionMain,
    awsRegionBackup: projectData.awsRegionBackup,
    crEndpointMain: projectData.crEndpointMain,
    crEndpointBackup: projectData.crEndpointBackup,
  };

  await ProjectDetail.create([newProjectDetail], { session });
};

const createConnectivityDetail = async (projectId, projectData, session) => {
  const newConnectivityDetail = {
    projectId: projectId,
    messageTransformation: projectData.messageTransformation,
    messageCertificate: projectData.messageCertificate,
    connectivityType: projectData.connectivityType,
    mainPublicIps: projectData.mainPublicIps,
    backupVPNPeers: projectData.backupVPNPeers,
    internalNetworkCIDR: projectData.internalNetworkCIDR,
    customerVPNGatewayMakeModel: projectData.customerVPNGatewayMakeModel,
    vpnGatewaySoftwareVersion: projectData.vpnGatewaySoftwareVersion,
    routingMethods: projectData.routingMethods,
    desiredRCsideCIDRs: projectData.desiredRCsideCIDRs,
    customerVPNPeerIps: projectData.customerVPNPeerIps,
    vpnAuthentication: projectData.vpnAuthentication,
    preferredFileExchangeMethod: projectData.preferredFileExchangeMethod,
    ikeVersion: projectData.ikeVersion,
    phase1EncryptionAlgorithm: projectData.phase1EncryptionAlgorithm,
    phase1IntegrityAlgorithm: projectData.phase1IntegrityAlgorithm,
    phase1DiffleHellmanAlgorithm: projectData.phase1DiffleHellmanAlgorithm,
    phase1Lifetime: projectData.phase1Lifetime,
    phase2EncryptionAlgorithm: projectData.phase2EncryptionAlgorithm,
    phase2IntegrityAlgorithm: projectData.phase2IntegrityAlgorithm,
    phase2DiffleHellmanAlgorithm: projectData.phase2DiffleHellmanAlgorithm,
    phase2Lifetime: projectData.phase2Lifetime,
    deadPeerDetectionTimeout: projectData.deadPeerDetectionTimeout,
    rekeyMarginTime: projectData.rekeyMarginTime,
    rekeyFuzz: projectData.rekeyFuzz,
    replayWindowSize: projectData.replayWindowSize,
  };

  await ConnectivityDetail.create([newConnectivityDetail], { session });
};

const updateMessageCertificates = async (projectId, projectData, session) => {
  if (projectData.messageCertificateIds.length > 0) {
    await MessageCertificate.updateMany(
      { _id: { $in: projectData.messageCertificateIds } },
      { $set: { projectId: projectId } },
      { session }
    );
  }
};

const createProject = async (projectData, session, createdBy) => {
  return await Project.create(
    [
      {
        customerName: projectData.customerName,
        projectName: projectData.projectName,
        sow: projectData.sow,
        customerContactName: projectData.contactName,
        customerContactEmail: projectData.contactEmail,
        rcAccountId: projectData.rcAccountId,
        projectStatus: projectStatus.INPROGRESS,
        createdBy,
      },
    ],
    { session }
  );
};
