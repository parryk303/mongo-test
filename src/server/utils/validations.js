import JobTitle from '@models/job-title';
import Role from '@models/role';
import errorCodes from './error-codes';
import { regexList } from './constants';
import MessageCertificate from '@models/message-certificate';

export const validateJobTitleId = async (jobTitleId) => {
  try {
    const isExists = await JobTitle.countDocuments({ _id: jobTitleId });
    if (!isExists) {
      throw {
        message: 'Job title id not found.',
        statusCode: 404,
      };
    }
  } catch (e) {
    throw e;
  }
};
export const validateRoleId = async (roleId, returnData = false) => {
  try {
    const isExists = await Role.countDocuments({ _id: roleId });
    if (!isExists) {
      throw {
        message: 'Role id not found.',
        statusCode: 404,
      };
    }
    if (returnData) {
      return await Role.findOne({ _id: roleId });
    }
  } catch (e) {
    throw e;
  }
};
export const validateMessageCertificates = async (ids) => {
  try {
    const certificates = await MessageCertificate.find({ _id: { $in: ids } });
    if (certificates.length <= 0) {
      throw {
        message: 'message certificate id(s) not found.',
        statusCode: 404,
      };
    }
    const certificateIds = certificates.map((e) => e._id);
    if (certificates.length < ids.length) {
      throw {
        message: `message certificate with id(s): ${ids
          .filter((id) => !certificateIds.includes(id))
          .join(',')} not found.`,
        statusCode: 404,
      };
    }
  } catch (e) {
    throw e;
  }
};

export const validateUserData = ({ email, firstName, lastName, roleId, jobTitleId, companyName }) => {
  let errors = [];
  if (!email) {
    errors.push(errorCodes.emailRequired);
  } else if (email) {
    if (regexList.ISEMAIL.test(email) != true) {
      errors.push(errorCodes.invalidEmail);
    }
  }
  if (!firstName) {
    errors.push(errorCodes.firstNameRequired);
  }
  if (!lastName) {
    errors.push(errorCodes.lastNameRequired);
  }
  if (!roleId) {
    errors.push(errorCodes.roleIdRequired);
  }
  if (!jobTitleId) {
    errors.push(errorCodes.jobTitleIdRequired);
  }
  if (!companyName) {
    errors.push(errorCodes.companyNameRequired);
  }
  return errors.length > 0 ? errors : false;
};

export const validateProjectData = (
  {
    rcAccountId,
    customerName,
    contactName,
    contactEmail,
    projectName,
    sow,
    messageTransformation,
    messageCertificate,
    connectivityType,
    description,
    siteToSiteVPN,
    devTestEndpoint,
    productionEndpoint,
    applicationCredentials,
    crIdentifier,
    awsRegionMain,
    awsRegionBackup,
    crEndpointMain,
    crEndpointBackup,
    mainPublicIps,
    backupVPNPeers,
    internalNetworkCIDR,
    customerVPNGatewayMakeModel,
    vpnGatewaySoftwareVersion,
    routingMethods,
    desiredRCsideCIDRs,
    customerVPNPeerIps,
    vpnAuthentication,
    preferredFileExchangeMethod,
    ikeVersion,
    phase1EncryptionAlgorithm,
    phase1IntegrityAlgorithm,
    phase1DiffleHellmanAlgorithm,
    phase1Lifetime,
    phase2EncryptionAlgorithm,
    phase2IntegrityAlgorithm,
    phase2DiffleHellmanAlgorithm,
    phase2Lifetime,
    deadPeerDetectionTimeout,
    rekeyMarginTime,
    rekeyFuzz,
    replayWindowSize,
    messageCertificateIds,
  },
  patch = false
) => {
  let errors = [];
  if (!rcAccountId && patch == false) {
    errors.push(errorCodes.rcAccountIdRequired);
  } else if (rcAccountId) {
    if (regexList.ISNUMBER.test(rcAccountId) != true) {
      errors.push(errorCodes.invalidAccountId);
    }
  }
  if (!customerName && patch == false) {
    errors.push(errorCodes.customerNameRequired);
  }
  if (!contactEmail && patch == false) {
    errors.push(errorCodes.contactEmailRequired);
  }
  if (!contactName && patch == false) {
    errors.push(errorCodes.contactNameRequired);
  }
  if (!projectName && patch == false) {
    errors.push(errorCodes.projectNameRequired);
  }
  // if (!sow && patch == false) {
  //   errors.push(errorCodes.sowRequired);
  // }
  if (!messageTransformation && patch == false) {
    errors.push(errorCodes.messageTransformationRequired);
  }
  if (typeof messageCertificate != 'undefined' && typeof messageCertificate !== 'boolean') {
    errors.push(errorCodes.invalidMessageCertificate);
  } else if (typeof messageCertificate != 'undefined' && messageCertificate) {
    if (
      !messageCertificateIds ||
      !Array.isArray(messageCertificateIds) ||
      (Array.isArray(messageCertificateIds) && messageCertificateIds.length <= 0)
    ) {
      errors.push(errorCodes.messageCertificateIdsRequired);
    }
  }
  if (!connectivityType && patch == false) {
    errors.push(errorCodes.connectivityTypeRequired);
  }
  // if (!description && patch == false) {
  //   errors.push(errorCodes.descriptionRequired);
  // }
  // if (typeof siteToSiteVPN == undefined && patch == false) {
  //   errors.push(errorCodes.siteToSiteVPNRequired);
  // } else
  if (typeof siteToSiteVPN != undefined) {
    if (typeof siteToSiteVPN !== 'boolean') {
      errors.push(errorCodes.invalidSiteToSiteVPN);
    }
  }
  if (devTestEndpoint && !Array.isArray(devTestEndpoint)) {
    errors.push(errorCodes.invalidDevTestEndpoint);
  }

  if (productionEndpoint && !Array.isArray(productionEndpoint)) {
    errors.push(errorCodes.invalidProductionEndpoint);
  }

  if (applicationCredentials && typeof applicationCredentials !== 'string') {
    errors.push(errorCodes.invalidApplicationCredentials);
  }

  if (crIdentifier && typeof crIdentifier !== 'string') {
    errors.push(errorCodes.invalidCrIdentifier);
  }

  if (awsRegionMain && typeof awsRegionMain !== 'string') {
    errors.push(errorCodes.invalidAwsRegionMain);
  }

  if (awsRegionBackup && typeof awsRegionBackup !== 'string') {
    errors.push(errorCodes.invalidAwsRegionBackup);
  }

  if (crEndpointMain && typeof crEndpointMain !== 'string') {
    errors.push(errorCodes.invalidCrEndpointMain);
  }

  if (crEndpointBackup && typeof crEndpointBackup !== 'string') {
    errors.push(errorCodes.invalidCrEndpointBackup);
  }
  if (mainPublicIps && !Array.isArray(mainPublicIps)) {
    errors.push(errorCodes.invalidMainPublicIps);
  }

  if (backupVPNPeers && !Array.isArray(backupVPNPeers)) {
    errors.push(errorCodes.invalidBackupVPNPeers);
  }

  if (internalNetworkCIDR && typeof internalNetworkCIDR !== 'string') {
    errors.push(errorCodes.invalidInternalNetworkCIDR);
  }

  if (customerVPNGatewayMakeModel && typeof customerVPNGatewayMakeModel !== 'string') {
    errors.push(errorCodes.invalidCustomerVPNGatewayMakeModel);
  }

  if (vpnGatewaySoftwareVersion && typeof vpnGatewaySoftwareVersion !== 'string') {
    errors.push(errorCodes.invalidVpnGatewaySoftwareVersion);
  }

  if (routingMethods && typeof routingMethods !== 'string') {
    errors.push(errorCodes.invalidRoutingMethods);
  }

  if (desiredRCsideCIDRs && !Array.isArray(desiredRCsideCIDRs)) {
    errors.push(errorCodes.invalidDesiredRCsideCIDRs);
  }

  if (customerVPNPeerIps && !Array.isArray(customerVPNPeerIps)) {
    errors.push(errorCodes.invalidCustomerVPNPeerIps);
  }

  if (vpnAuthentication && !Array.isArray(vpnAuthentication)) {
    errors.push(errorCodes.invalidVpnAuthentication);
  }

  if (preferredFileExchangeMethod && typeof preferredFileExchangeMethod !== 'string') {
    errors.push(errorCodes.invalidPreferredFileExchangeMethod);
  }

  if (ikeVersion && typeof ikeVersion !== 'string') {
    errors.push(errorCodes.invalidIkeVersion);
  }

  if (phase1EncryptionAlgorithm && typeof phase1EncryptionAlgorithm !== 'string') {
    errors.push(errorCodes.invalidPhase1EncryptionAlgorithm);
  }

  if (phase1IntegrityAlgorithm && typeof phase1IntegrityAlgorithm !== 'string') {
    errors.push(errorCodes.invalidPhase1IntegrityAlgorithm);
  }

  if (phase1DiffleHellmanAlgorithm && typeof phase1DiffleHellmanAlgorithm !== 'string') {
    errors.push(errorCodes.invalidPhase1DiffleHellmanAlgorithm);
  }

  if (phase1Lifetime && typeof phase1Lifetime !== 'string') {
    errors.push(errorCodes.invalidPhase1Lifetime);
  }

  if (phase2EncryptionAlgorithm && typeof phase2EncryptionAlgorithm !== 'string') {
    errors.push(errorCodes.invalidPhase2EncryptionAlgorithm);
  }

  if (phase2IntegrityAlgorithm && typeof phase2IntegrityAlgorithm !== 'string') {
    errors.push(errorCodes.invalidPhase2IntegrityAlgorithm);
  }

  if (phase2DiffleHellmanAlgorithm && typeof phase2DiffleHellmanAlgorithm !== 'string') {
    errors.push(errorCodes.invalidPhase2DiffleHellmanAlgorithm);
  }

  if (phase2Lifetime && typeof phase2Lifetime !== 'string') {
    errors.push(errorCodes.invalidPhase2Lifetime);
  }

  if (deadPeerDetectionTimeout && typeof deadPeerDetectionTimeout !== 'string') {
    errors.push(errorCodes.invalidDeadPeerDetectionTimeout);
  }

  if (rekeyMarginTime && typeof rekeyMarginTime !== 'string') {
    errors.push(errorCodes.invalidRekeyMarginTime);
  }

  if (rekeyFuzz && typeof rekeyFuzz !== 'string') {
    errors.push(errorCodes.invalidRekeyFuzz);
  }

  if (replayWindowSize && typeof replayWindowSize !== 'string') {
    errors.push(errorCodes.invalidReplayWindowSize);
  }
  return errors.length > 0 ? errors : false;
};
