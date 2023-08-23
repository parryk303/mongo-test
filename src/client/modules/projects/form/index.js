import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProjectFormView from "./view";
import Service from "../service";
import { validate as validator } from "@client/utils";
import { VALIDATIONS } from "@client/shared/constants";

const messageCertificateList = [
  { label: "True", value: true },
  { label: "False", value: false },
];

const siteToSiteVPNList = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const messageTransformationList = [
  { label: "SOAP to JSON", value: "soap-to-json" },
  { label: "JSON to SOAP", value: "json-to-soap" },
  { label: "None", value: "none" },
  { label: "Other", value: "other" },
];

const FIELD_VALIDATOR_CONFIG = {
  customerName: [{ type: VALIDATIONS.REQUIRED, value: true }],
  projectName: [{ type: VALIDATIONS.REQUIRED, value: true }],
  contactName: [{ type: VALIDATIONS.REQUIRED, value: true }],
  contactEmail: [
    { type: VALIDATIONS.REQUIRED, value: true },
    { type: VALIDATIONS.EMAILS, value: true },
  ],
  rcAccountId: [{ type: VALIDATIONS.REQUIRED, value: true }],
  siteToSiteVPN: [{ type: VALIDATIONS.REQUIRED, value: true }],
  devTestEndpoint: [
    // { type: VALIDATIONS.REQUIRED, value: true },
    // {
    //   type: VALIDATIONS.REGEX,
    //   value: new RegExp(
    //     "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    //   ),
    // },
  ],
  productionEndpoint: [
    // { type: VALIDATIONS.REQUIRED, value: true },
    // {
    //   type: VALIDATIONS.REGEX,
    //   value: new RegExp(
    //     "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    //   ),
    // },
  ],
  applicationCredentials: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  description: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  crIdentifier: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  awsRegionMain: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  awsRegionBackup: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  crEndpointMain: [
    // { type: VALIDATIONS.REQUIRED, value: true },
    // {
    //   type: VALIDATIONS.REGEX,
    //   value: new RegExp(
    //     "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    //   ),
    // },
  ],
  crEndpointBackup: [
    // { type: VALIDATIONS.REQUIRED, value: true },
    // {
    //   type: VALIDATIONS.REGEX,
    //   value: new RegExp(
    //     "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    //   ),
    // },
  ],
  messageTransformation: [
    { type: VALIDATIONS.REQUIRED, value: true }
  ],
  messageTransformationOther: [
    { type: VALIDATIONS.REQUIRED, value: true }
  ],
  connectivityTypeOther: [
    { type: VALIDATIONS.REQUIRED, value: true }
  ],
  messageCertificate: [
    { type: VALIDATIONS.REQUIRED, value: true }
  ],
  selectedCertificates: [
    { type: VALIDATIONS.REQUIRED, value: true }
  ],
  connectivityType: [
    { type: VALIDATIONS.REQUIRED, value: true }
  ],
  sow: [
    { type: VALIDATIONS.REQUIRED, value: true },
    {
      type: VALIDATIONS.REGEX,
      value: new RegExp(
        "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
      ),
    },
  ],
  requestedBuildDate: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  buildDate: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  uatStartDate: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  uatEndDate: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  expiringDate: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  renewalDate: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  mainPublicIps: [
    // { type: VALIDATIONS.REQUIRED, value: true },
    {
      type: VALIDATIONS.REGEX,
      value:
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    },
  ],
  backupVPNPeers: [
    // { type: VALIDATIONS.REQUIRED, value: true },
    {
      type: VALIDATIONS.REGEX,
      value:
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    },
  ],
  internalNetworkCIDR: [
    // { type: VALIDATIONS.REQUIRED, value: true },
    // {
    //   type: VALIDATIONS.REGEX,
    //   value:
    //     /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    // },
  ],
  customerVPNGatewayMakeModel: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  vpnGatewaySoftwareVersion: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  routingMethods: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  desiredRCsideCIDRs: [
    // { type: VALIDATIONS.REQUIRED, value: true },
    // {
    //   type: VALIDATIONS.REGEX,
    //   value:
    //     /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    // },
  ],
  customerVPNPeerIps: [
    // { type: VALIDATIONS.REQUIRED, value: true },
    {
      type: VALIDATIONS.REGEX,
      value:
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    },
  ],
  vpnAuthentication: [
    // { type: VALIDATIONS.REQUIRED, value: true },
    // {
    //   type: VALIDATIONS.REGEX,
    //   value:
    //     /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    // },
  ],
  preferredFileExchangeMethod: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  phase1EncryptionAlgorithm: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  phase1IntegrityAlgorithm: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  phase1DiffleHellmanAlgorithm: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  phase1Lifetime: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  phase2EncryptionAlgorithm: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  phase2IntegrityAlgorithm: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  phase2DiffleHellmanAlgorithm: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  phase2Lifetime: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  ikeVersion: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  deadPeerDetectionTimeout: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  rekeyMarginTime: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  rekeyFuzz: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
  replayWindowSize: [
    // { type: VALIDATIONS.REQUIRED, value: true }
  ],
};

const defaultState = {
  isCertificateSaving: false,
  isSOWSaving: false,
  panelIndex: 0,
  isSubmitting: false,
  contectivityTypeList: [],
  customerName: "",
  projectName: "",
  sow: "",
  contactName: "",
  contactEmail: "",
  rcAccountId: "",
  messageTransformation: "",
  messageTransformationOther: "",
  connectivityTypeOther: "",
  messageCertificate: "",
  connectivityType: "",
  siteToSiteVPN: "",
  devTestEndpoint: [],
  productionEndpoint: [],
  applicationCredentials: "",
  description: "",
  requestedBuildDate: "",
  buildDate: "",
  uatStartDate: "",
  uatEndDate: "",
  expiringDate: "",
  renewalDate: "",
  crIdentifier: "",
  awsRegionMain: "",
  awsRegionBackup: "",
  crEndpointMain: "",
  crEndpointBackup: "",
  mainPublicIps: [],
  backupVPNPeers: [],
  internalNetworkCIDR: "",
  customerVPNGatewayMakeModel: "",
  vpnGatewaySoftwareVersion: "",
  routingMethods: "",
  desiredRCsideCIDRs: [],
  customerVPNPeerIps: [],
  vpnAuthentication: [],
  preferredFileExchangeMethod: "",
  phase1EncryptionAlgorithm: "",
  phase1IntegrityAlgorithm: "",
  phase1DiffleHellmanAlgorithm: "",
  phase1Lifetime: "",
  phase2EncryptionAlgorithm: "",
  phase2IntegrityAlgorithm: "",
  phase2DiffleHellmanAlgorithm: "",
  phase2Lifetime: "",
  ikeVersion: "",
  deadPeerDetectionTimeout: "",
  rekeyMarginTime: "",
  rekeyFuzz: "",
  replayWindowSize: "",
  selectedCertificates: [],
  selectedSOWFile: null,
  isButtonloading: '',
  currentDateField: "",
  errors: {
    customerName: " ",
    projectName: " ",
    sow: " ",
    contactName: " ",
    contactEmail: " ",
    rcAccountId: " ",
    messageTransformation: " ",
    messageTransformationOther: " ",
    connectivityTypeOther: " ",
    messageCertificate: " ",
    connectivityType: " ",
    siteToSiteVPN: " ",
    devTestEndpoint: " ",
    productionEndpoint: " ",
    applicationCredentials: " ",
    description: " ",
    requestedBuildDate: " ",
    buildDate: " ",
    uatStartDate: " ",
    uatEndDate: " ",
    expiringDate: " ",
    renewalDate: " ",
    crIdentifier: " ",
    awsRegionMain: " ",
    awsRegionBackup: " ",
    crEndpointMain: " ",
    crEndpointBackup: " ",
    mainPublicIps: " ",
    backupVPNPeers: " ",
    internalNetworkCIDR: " ",
    customerVPNGatewayMakeModel: " ",
    vpnGatewaySoftwareVersion: " ",
    routingMethods: " ",
    desiredRCsideCIDRs: " ",
    customerVPNPeerIps: " ",
    vpnAuthentication: " ",
    preferredFileExchangeMethod: " ",
    phase1EncryptionAlgorithm: " ",
    phase1IntegrityAlgorithm: " ",
    phase1DiffleHellmanAlgorithm: " ",
    phase1Lifetime: " ",
    phase2EncryptionAlgorithm: " ",
    phase2IntegrityAlgorithm: " ",
    phase2DiffleHellmanAlgorithm: " ",
    phase2Lifetime: " ",
    ikeVersion: " ",
    deadPeerDetectionTimeout: " ",
    rekeyMarginTime: " ",
    rekeyFuzz: " ",
    replayWindowSize: " ",
  },
};

const ProjectForm = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(defaultState);

  const fetchConnectivityTypeList = useCallback(async () => {
    const { data, error } = await Service.getConnectivityTypeList();

    if (error) {
      toast.error(Array.isArray(error) ? error[0]?.message : error);
    } else {
      setState((prevState) => ({
        ...prevState,
        contectivityTypeList:
          data?.connectivityTypes || defaultState.contectivityTypeList,
      }));
    }
  }, []);

  const changeTab = (panelIndex = 0) => {
    setState((prevState) => ({
      ...prevState,
      panelIndex,
    }));
  };

  const handleSubmit = async () => {
    setState((prevState) => ({
      ...prevState,
      isSubmitting: true,
    }));

    const {
      panelIndex,
      isSubmitting,
      contectivityTypeList,
      isCertificateSaving,
      isSOWSaving,
      errors,
      ...payload
    } =
      state;
    const { error } = await Service.post({
      ...payload,
      messageTransformation:
        payload?.messageTransformation?.value === "other"
          ? payload.messageTransformationOther
          : payload?.messageTransformation?.label,
      siteToSiteVPN: payload?.siteToSiteVPN?.value,
      messageCertificate: payload?.messageCertificate?.value,
      messageCertificateIds: payload.selectedCertificates?.map(
        (item) => item.id
      ),
      connectivityType:
        payload?.connectivityType?.name === "Other"
          ? payload.connectivityTypeOther
          : payload?.connectivityType?.name,
    });

    setState((prevState) => ({
      ...prevState,
      isSubmitting: false,
    }));

    if (error) {
      toast.error(Array.isArray(error) ? error[0]?.message : error);
    } else {
      toast.success("Project created successfully.");
      navigate("/");
    }
  };

  const handleAction = (lastIndex = false, isPrevious = false) => {
    if (lastIndex) {
      handleSubmit();
    } else {
      setState((prevState) => ({
        ...prevState,
        panelIndex: isPrevious
          ? --prevState.panelIndex
          : ++prevState.panelIndex,
      }));
    }
  };

  const setCurrentDateField = (index) => {
    setState((prevState) => ({
      ...prevState,
      currentDateField: index,
    }));
  };

  const validateFields = (field, value) => {
    let errorMessage = "";
    if (FIELD_VALIDATOR_CONFIG[field]) {
      const validationResult = FIELD_VALIDATOR_CONFIG[field].map(
        (validation) => {
          const isFieldRequired = FIELD_VALIDATOR_CONFIG[field].some(item => item.type === VALIDATIONS.REQUIRED);
          return (
            Array.isArray(value) ? (value.length ? value : (isFieldRequired ? [""]: [])) : [value]
          ).map((value) =>
            validator(
              value,
              validation.type,
              validation.value,
              validation.inputType || "string"
            )
          );
        }
      );
      errorMessage = validationResult.map((item) => {
        return item
          .filter((error) => !error?.isValid)
          .map((error) => error?.errorMessage)[0];
      });
      errorMessage = errorMessage.find((item) => item);
    } else {
      let errorFieldsMap = {
        0: ["customerName", "projectName", "contactName", "contactEmail", "rcAccountId"],
        1: ["siteToSiteVPN", "devTestEndpoint", "productionEndpoint", "applicationCredentials", "description"],
        2: ["requestedBuildDate", "buildDate", "uatStartDate", "uatEndDate", "expiringDate", "renewalDate"],
        3: ["crIdentifier", "awsRegionMain", "awsRegionBackup", "crEndpointMain", "crEndpointBackup"],
        4: ["messageTransformation", "messageCertificate", "connectivityType", "sow"],
        5: ["mainPublicIps", "backupVPNPeers", "internalNetworkCIDR", "customerVPNGatewayMakeModel", "vpnGatewaySoftwareVersion"],
        6: ["routingMethods", "desiredRCsideCIDRs", "customerVPNPeerIps", "vpnAuthentication", "preferredFileExchangeMethod"],
        7: ["phase1EncryptionAlgorithm", "phase1IntegrityAlgorithm", "phase1DiffleHellmanAlgorithm", "phase1Lifetime"],
        8: ["phase2EncryptionAlgorithm", "phase2IntegrityAlgorithm", "phase2DiffleHellmanAlgorithm", "phase2Lifetime"],
        9: ["ikeVersion", "deadPeerDetectionTimeout", "rekeyMarginTime", "rekeyFuzz", "replayWindowSize"],
      };
      if (state.messageTransformation?.value === 'other') {
        errorFieldsMap["4"].push("messageTransformationOther")
      }
      if (state.connectivityType?.name === 'Other') {
        errorFieldsMap["4"].push("connectivityTypeOther")
      }
      if (state.messageCertificate?.value) {
        errorFieldsMap["4"].push("selectedCertificates")
      }
      Object.keys(FIELD_VALIDATOR_CONFIG).forEach((key) => {
        const message =
          (errorFieldsMap[state.panelIndex] || []).includes(key) &&
          validateFields(key, state[key]);
        if (!!message) {
          errorMessage = message;
        }
      });
    }

    return errorMessage;
  };

  const handleFieldChange = (evt) => {
    const name = evt?.name || evt?.target?.name;
    let value = evt?.value || evt?.target?.value;
    const errorMessage = validateFields(name, value) || " ";
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: errorMessage,
      },
    }));
  };

  const handleSOWFileSelection = useCallback(async (event) => {
    let selectedSOWFile = null;
    if (event.currentTarget.files && event.currentTarget.files?.length > 0) {
      selectedSOWFile = event.currentTarget.files[0];
    }
    if (!selectedSOWFile) {
      return;
    }
    var formData = new FormData();
    formData.append("file", selectedSOWFile);
    setState(prevState => ({
      ...prevState,
      isSOWSaving: true,
    }));
    const { data, error } = await Service.uploadSOWFile(formData);
    if (error) {
      toast.error(Array.isArray(error) ? error[0]?.message : error);
      setState(prevState => ({
        ...prevState,
        isSOWSaving: false,
      }));
    } else {
      toast.success("File Uploaded successfully.");
      setState((prevState) => ({
        ...prevState,
        selectedSOWFile,
        sow: data.sow,
        isSOWSaving: false,
      }));
    }
  }, []);

  const handleCertificateSelection = useCallback(async (event) => {
    let selectedCertificates = [];
    if (event.currentTarget.files && event.currentTarget.files?.length > 0) {
      for (let i = 0; i < event.currentTarget.files.length; i++) {
        selectedCertificates.push(event.currentTarget.files[i]);
      }
    }
    if (!selectedCertificates.length) {
      return;
    }
    selectedCertificates?.map(async (certificate) => {
      var formData = new FormData();
      formData.append("file", certificate);

      setState(prevState => ({
        ...prevState,
        isCertificateSaving: true,
      }));
      const { data, error } = await Service.uploadMessageCertificate(formData);
      if (error) {
        setState(prevState => ({
          ...prevState,
          isCertificateSaving: false,
        }));
        return toast.error(Array.isArray(error) ? error[0]?.message : error);
      } else {
        setState((prevState) => ({
          ...prevState,
          selectedCertificates: [
            { name: certificate.name, id: data.messageCertificateId },
            ...prevState.selectedCertificates,
          ],
          isCertificateSaving: false
        }));
        return toast.success("File Uploaded successfully.");
      }
    });
  }, []);

  const handleDeleteCertificate = useCallback(async (id = "") => {
    setState((prevState) => ({
      ...prevState,
      isButtonloading: id,
    }));
    const { data, error } = await Service.deleteMessageCertificate(id);
    if (error) {
      setState((prevState) => ({
        ...prevState,
        isButtonloading: '',
      }));
      toast.error(Array.isArray(error) ? error[0]?.message : error);
    } else {
      toast.success("File Removed successfully.");
      setState((prevState) => ({
        ...prevState,
        selectedCertificates: prevState.selectedCertificates.filter(
          (item) => item.id !== id
        ),
        isButtonloading: '',
      }));
    }
  }, []);

  const isPanelInvalid = validateFields();

  useEffect(() => {
    fetchConnectivityTypeList();
  }, [fetchConnectivityTypeList]);

  return (
    <ProjectFormView
      isCertificateSaving={state.isCertificateSaving}
      isSOWSaving={state.isSOWSaving}
      panelIndex={state.panelIndex}
      isSubmitting={state.isSubmitting}
      messageCertificateList={messageCertificateList}
      messageTransformationList={messageTransformationList}
      contectivityTypeList={state.contectivityTypeList}
      siteToSiteVPNList={siteToSiteVPNList}
      customerName={state.customerName}
      projectName={state.projectName}
      sow={state.sow}
      contactName={state.contactName}
      contactEmail={state.contactEmail}
      rcAccountId={state.rcAccountId}
      messageTransformation={state.messageTransformation}
      messageTransformationOther={state.messageTransformationOther}
      connectivityTypeOther={state.connectivityTypeOther}
      messageCertificate={state.messageCertificate}
      connectivityType={state.connectivityType}
      siteToSiteVPN={state.siteToSiteVPN}
      devTestEndpoint={state.devTestEndpoint}
      productionEndpoint={state.productionEndpoint}
      applicationCredentials={state.applicationCredentials}
      description={state.description}
      requestedBuildDate={state.requestedBuildDate}
      buildDate={state.buildDate}
      uatStartDate={state.uatStartDate}
      uatEndDate={state.uatEndDate}
      expiringDate={state.expiringDate}
      renewalDate={state.renewalDate}
      crIdentifier={state.crIdentifier}
      awsRegionMain={state.awsRegionMain}
      awsRegionBackup={state.awsRegionBackup}
      crEndpointMain={state.crEndpointMain}
      crEndpointBackup={state.crEndpointBackup}
      mainPublicIps={state.mainPublicIps}
      backupVPNPeers={state.backupVPNPeers}
      internalNetworkCIDR={state.internalNetworkCIDR}
      customerVPNGatewayMakeModel={state.customerVPNGatewayMakeModel}
      vpnGatewaySoftwareVersion={state.vpnGatewaySoftwareVersion}
      routingMethods={state.routingMethods}
      desiredRCsideCIDRs={state.desiredRCsideCIDRs}
      customerVPNPeerIps={state.customerVPNPeerIps}
      vpnAuthentication={state.vpnAuthentication}
      preferredFileExchangeMethod={state.preferredFileExchangeMethod}
      phase1EncryptionAlgorithm={state.phase1EncryptionAlgorithm}
      phase1IntegrityAlgorithm={state.phase1IntegrityAlgorithm}
      phase1DiffleHellmanAlgorithm={state.phase1DiffleHellmanAlgorithm}
      phase1Lifetime={state.phase1Lifetime}
      phase2EncryptionAlgorithm={state.phase2EncryptionAlgorithm}
      phase2IntegrityAlgorithm={state.phase2IntegrityAlgorithm}
      phase2DiffleHellmanAlgorithm={state.phase2DiffleHellmanAlgorithm}
      phase2Lifetime={state.phase2Lifetime}
      ikeVersion={state.ikeVersion}
      deadPeerDetectionTimeout={state.deadPeerDetectionTimeout}
      rekeyMarginTime={state.rekeyMarginTime}
      rekeyFuzz={state.rekeyFuzz}
      replayWindowSize={state.replayWindowSize}
      isPanelInvalid={isPanelInvalid}
      errors={state.errors}
      changeTab={changeTab}
      handleAction={handleAction}
      handleFieldChange={handleFieldChange}
      selectedSOWFile={state.selectedSOWFile}
      selectedCertificates={state.selectedCertificates}
      isButtonloading={state.isButtonloading}
      currentDateField={state.currentDateField}
      setCurrentDateField={setCurrentDateField}
      handleSOWFileSelection={handleSOWFileSelection}
      handleCertificateSelection={handleCertificateSelection}
      handleDeleteCertificate={handleDeleteCertificate}
    />
  );
};

export default ProjectForm;
