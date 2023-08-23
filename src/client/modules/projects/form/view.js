import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AdvanceDetails from "./panels/advance-details";
import BasicDetails from "./panels/basic-details";
import CircleIcon from "@mui/icons-material/Circle";
import CircularProgress from "@mui/material/CircularProgress";
import { noop } from "src/client/shared/constants";
import ProjectMainDetails from "./panels/project-main-details";
import ProjectDatesDetails from "./panels/project-dates-details";
import ProjectAWSDetails from "./panels/project-aws-details";
import ConnectivityNetworkDetails from "./panels/connectivity-network-details";
import ConnectivityRoutingDetails from "./panels/connectivity-routing-details";
import ConnectivityPhaseDetails from "./panels/connectivity-phase-details";
import ConnectivityPhase2Details from "./panels/connectivity-phase2-details";
import ConnectivityPeerDetails from "./panels/connectivity-peer-details";

const ProjectFormView = ({
  isCertificateSaving = false,
  isSOWSaving = false,
  panelIndex = 0,
  isSubmitting = false,
  messageCertificateList = [],
  messageTransformationList = [],
  contectivityTypeList = [],
  siteToSiteVPNList = [],
  customerName = "",
  projectName = "",
  sow = "",
  contactName = "",
  contactEmail = "",
  rcAccountId = "",
  messageTransformation = "",
  messageTransformationOther = "",
  connectivityTypeOther = "",
  messageCertificate = "",
  connectivityType = "",
  siteToSiteVPN = "",
  devTestEndpoint = [],
  productionEndpoint = [],
  applicationCredentials = "",
  description = "",
  requestedBuildDate = "",
  buildDate = "",
  uatStartDate = "",
  uatEndDate = "",
  expiringDate = "",
  renewalDate = "",
  crIdentifier = "",
  awsRegionMain = "",
  awsRegionBackup = "",
  crEndpointMain = "",
  crEndpointBackup = "",
  mainPublicIps = [],
  backupVPNPeers = [],
  internalNetworkCIDR = "",
  customerVPNGatewayMakeModel = "",
  vpnGatewaySoftwareVersion = "",
  routingMethods = "",
  desiredRCsideCIDRs = [],
  customerVPNPeerIps = [],
  vpnAuthentication = [],
  preferredFileExchangeMethod = "",
  phase1EncryptionAlgorithm = "",
  phase1IntegrityAlgorithm = "",
  phase1DiffleHellmanAlgorithm = "",
  phase1Lifetime = "",
  phase2EncryptionAlgorithm = "",
  phase2IntegrityAlgorithm = "",
  phase2DiffleHellmanAlgorithm = "",
  phase2Lifetime = "",
  ikeVersion = "",
  deadPeerDetectionTimeout = "",
  rekeyMarginTime = "",
  rekeyFuzz = "",
  replayWindowSize = "",
  isPanelInvalid = false,
  selectedSOWFile = null,
  selectedCertificates = [],
  isButtonloading = '',
  currentDateField = "",
  errors = {},
  setCurrentDateField = noop,
  handleAction = noop,
  handleFieldChange = noop,
  handleSOWFileSelection = noop,
  handleCertificateSelection = noop,
  handleDeleteCertificate = noop,
}) => {
  return (
    <Box>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontFamily: "inter_bold" }} variant="h4">
          New Project
        </Typography>
      </Box>
      <Box>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Paper elevation={2} sx={{ p: 10 }}>
            <Box sx={{ height: "536px", overflow: "auto", px: 4 }}>
              {panelIndex === 0 && (
                <BasicDetails
                  customerName={customerName}
                  projectName={projectName}
                  contactName={contactName}
                  contactEmail={contactEmail}
                  rcAccountId={rcAccountId}
                  errors={errors}
                  handleFieldChange={handleFieldChange}
                />
              )}
              {panelIndex === 1 && (
                <ProjectMainDetails
                  siteToSiteVPN={siteToSiteVPN}
                  devTestEndpoint={devTestEndpoint}
                  productionEndpoint={productionEndpoint}
                  applicationCredentials={applicationCredentials}
                  description={description}
                  siteToSiteVPNList={siteToSiteVPNList}
                  errors={errors}
                  handleFieldChange={handleFieldChange}
                />
              )}
              {panelIndex === 2 && (
                <ProjectDatesDetails
                  requestedBuildDate={requestedBuildDate}
                  buildDate={buildDate}
                  uatStartDate={uatStartDate}
                  uatEndDate={uatEndDate}
                  expiringDate={expiringDate}
                  renewalDate={renewalDate}
                  currentDateField={currentDateField}
                  errors={errors}
                  setCurrentDateField={setCurrentDateField}
                  handleFieldChange={handleFieldChange}
                />
              )}
              {panelIndex === 3 && (
                <ProjectAWSDetails
                  crIdentifier={crIdentifier}
                  awsRegionMain={awsRegionMain}
                  awsRegionBackup={awsRegionBackup}
                  crEndpointMain={crEndpointMain}
                  crEndpointBackup={crEndpointBackup}
                  errors={errors}
                  handleFieldChange={handleFieldChange}
                />
              )}
              {panelIndex === 4 && (
                <AdvanceDetails
                  isCertificateSaving={isCertificateSaving}
                  isSOWSaving={isSOWSaving}
                  messageTransformation={messageTransformation}
                  messageTransformationOther={messageTransformationOther}
                  connectivityTypeOther={connectivityTypeOther}
                  messageCertificate={messageCertificate}
                  connectivityType={connectivityType}
                  sow={sow}
                  messageTransformationList={messageTransformationList}
                  messageCertificateList={messageCertificateList}
                  contectivityTypeList={contectivityTypeList}
                  handleFieldChange={handleFieldChange}
                  selectedSOWFile={selectedSOWFile}
                  selectedCertificates={selectedCertificates}
                  isButtonloading={isButtonloading}
                  errors={errors}
                  handleSOWFileSelection={handleSOWFileSelection}
                  handleCertificateSelection={handleCertificateSelection}
                  handleDeleteCertificate={handleDeleteCertificate}
                />
              )}
              {panelIndex === 5 && (
                <ConnectivityNetworkDetails
                  mainPublicIps={mainPublicIps}
                  backupVPNPeers={backupVPNPeers}
                  internalNetworkCIDR={internalNetworkCIDR}
                  customerVPNGatewayMakeModel={customerVPNGatewayMakeModel}
                  vpnGatewaySoftwareVersion={vpnGatewaySoftwareVersion}
                  errors={errors}
                  handleFieldChange={handleFieldChange}
                />
              )}
              {panelIndex === 6 && (
                <ConnectivityRoutingDetails
                  routingMethods={routingMethods}
                  desiredRCsideCIDRs={desiredRCsideCIDRs}
                  customerVPNPeerIps={customerVPNPeerIps}
                  vpnAuthentication={vpnAuthentication}
                  preferredFileExchangeMethod={preferredFileExchangeMethod}
                  errors={errors}
                  handleFieldChange={handleFieldChange}
                />
              )}
              {panelIndex === 7 && (
                <ConnectivityPhaseDetails
                  phase1EncryptionAlgorithm={phase1EncryptionAlgorithm}
                  phase1IntegrityAlgorithm={phase1IntegrityAlgorithm}
                  phase1DiffleHellmanAlgorithm={phase1DiffleHellmanAlgorithm}
                  phase1Lifetime={phase1Lifetime}
                  errors={errors}
                  handleFieldChange={handleFieldChange}
                />
              )}
              {panelIndex === 8 && (
                <ConnectivityPhase2Details
                  phase2EncryptionAlgorithm={phase2EncryptionAlgorithm}
                  phase2IntegrityAlgorithm={phase2IntegrityAlgorithm}
                  phase2DiffleHellmanAlgorithm={phase2DiffleHellmanAlgorithm}
                  phase2Lifetime={phase2Lifetime}
                  errors={errors}
                  handleFieldChange={handleFieldChange}
                />
              )}
              {panelIndex === 9 && (
                <ConnectivityPeerDetails
                  ikeVersion={ikeVersion}
                  deadPeerDetectionTimeout={deadPeerDetectionTimeout}
                  rekeyMarginTime={rekeyMarginTime}
                  rekeyFuzz={rekeyFuzz}
                  replayWindowSize={replayWindowSize}
                  errors={errors}
                  handleFieldChange={handleFieldChange}
                />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 8,
              }}
            >
              <Box sx={{ mb: 2 }}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <CircleIcon
                    sx={{
                      mx: 2,
                      // cursor: 'pointer',
                      color: item === panelIndex ? "primary.main" : "grey.main",
                    }}
                    // onClick={() => changeTab(item)}
                  />
                ))}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Button
                  disabled={panelIndex === 0}
                  onClick={() => handleAction(false, true)}
                  variant="contained"
                >
                  Previous Step
                </Button>
                <Button
                  disabled={!!isPanelInvalid || isSubmitting}
                  variant="contained"
                  sx={{ position: "realtive" }}
                  onClick={() => handleAction(panelIndex === 9)}
                >
                  {panelIndex < 9 ? "Next Step" : "Submit"}
                  {isSubmitting && (
                    <CircularProgress size={28} sx={{ position: "absolute" }} />
                  )}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default ProjectFormView;
