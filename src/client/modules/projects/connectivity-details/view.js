import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { noop } from "src/client/shared/constants";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const ConnectivityDetailsView = ({
  //   isEditing = false,
  isAdmin,
  handleEditChange = noop,
  data = [],
  messageCertificates = [],
  handleCertificateDownload = noop,
}) => {
  const navigate = useNavigate(-1);
  const details = [
    {
      column1: [
        {
          label: "Message Transformation",
          value: data.messageTransformation || "-",
        },
        {
          label: "Message Certificate",
          value: data.messageCertificate ? "True" : "False",
          key: 'message-certificates'
        },
        {
          label: "Connectivity Type",
          value: data.connectivityType || "-",
        },
      ],
    },
    {
      column2: [
        {
          label: "Main Public IPs",
          value: data.mainPublicIps || "-",
        },
        {
          label: "Backup VPN Peers",
          value: data.backupVPNPeers || "-",
        },
        {
          label: "Internal Network CIDR",
          value: data.internalNetworkCIDR || "-",
        },
        {
          label: "Customer VPN Gateway Make/Model",
          value: data.customerVPNGatewayMakeModel || "-",
        },
        {
          label: "VPN Gateway Software Version",
          value: data.vpnGatewaySoftwareVersion || "-",
        },
        {
          label: "Routing Methods",
          value: data.routingMethods || "-",
        },
        {
          label: "Desired RingCentral-side/27 CIDRs",
          value: data.desiredRCsideCIDRs || "-",
        },
        {
          label: "Customer VPN Peer IPs",
          value: data.customerVPNPeerIps || "-",
        },
      ],
    },
    {
      column3: [
        {
          label: "VPN Authentication (PSK/RSA)",
          value: data.vpnAuthentication || "-",
        },
        {
          label: "Preferred File Exchange Method ",
          value: data.preferredFileExchangeMethod || "-",
        },
        {
          label: "IKE Version",
          value: data.ikeVersion || "-",
        },
        {
          label: "Phase 1 Encryption Algorithm",
          value: data.phase1EncryptionAlgorithm || "-",
        },
        {
          label: "Phase 1 Integrity Algorithm",
          value: data.phase1IntegrityAlgorithm || "-",
        },
        {
          label: "Phase 1 Diffie-Hellman Group",
          value: data.phase1DiffleHellmanAlgorithm || "-",
        },
        {
          label: "Phase 1 Lifetime",
          value: data.phase1Lifetime || "-",
        },
        {
          label: "Dead-Peer-Detection Timeout",
          value: data.deadPeerDetectionTimeout || "-",
        },
      ],
    },
    {
      column4: [
        {
          label: "Rekey Margin Time",
          value: data.rekeyMarginTime || "-",
        },
        {
          label: "Rekey Fuzz",
          value: data.rekeyFuzz || "-",
        },
        {
          label: "Replay Window Size",
          value: data.replayWindowSize || "-",
        },
        {
          label: "Phase 2 Encryption Algorithm",
          value: data.phase2IntegrityAlgorithm || "-",
        },
        {
          label: "Phase 2 Integrity Algorithm",
          value: data.phase2IntegrityAlgorithm || "-",
        },
        {
          label: "Phase 2 Diffie-Hellman Group",
          value: data.phase2IntegrityAlgorithm || "-",
        },
        {
          label: "Phase 2 Lifetime",
          value: data.phase2Lifetime || "-",
        },
      ],
    },
  ];

  return (
    <Box>
      <Box sx={{ ml: 4 }}>
        <IconButton onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon sx={{ fontSize: 36 }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontFamily: "inter_bold", my: 2 }} variant="h4">
          Connectivity Details
        </Typography>
      </Box>
      <Box>
        <Container maxWidth="xl" sx={{ my: 4 }}>
          <Paper elevation={2} sx={{ p: 6 }}>
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
                // mt: 2,
              }}
            >
              {!isAdmin && (
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  disabled
                  onClick={() => {
                    handleEditChange(true);
                  }}
                >
                  Edit
                </Button>
              )}
            </Box> */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
                my: 8,
                gap: 5,
              }}
            >
              {details.map((columnData) => (
                <Stack spacing={4}>
                  {Object.values(columnData)[0].map((item) => (
                    <Box sx={{ minHeight: 75 }} key={item.label}>
                      <Typography
                        // variant="h6"
                        sx={{
                          fontFamily: "inter_semibold",
                          fontSize: "large",
                        }}
                      >
                        {item.label}
                      </Typography>

                      {Array.isArray(item.value) ? (
                        item.value.map((val) => (
                          <Typography
                            sx={{
                              color: "grey.500",
                              fontFamily: "inter_medium",
                            }}
                            key={val}
                          >
                            {val}
                          </Typography>
                        ))
                      ) : (
                        <Typography
                          sx={{ color: "grey.500", fontFamily: "inter_medium" }}
                        >
                          {item.value}
                        </Typography>
                      )}
                      {(item.key === 'message-certificates' && !!messageCertificates.length) && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" sx={{ fontFamily: "inter_medium", mb: 2 }}>Certificate(s)</Typography>
                          {messageCertificates.map(element => (
                            <Tooltip title={element?.certificate?.s3key || ""} placement="top-start">
                              <Chip
                                label={element?.certificate?.s3key || ""}
                                variant="outlined"
                                deleteIcon={<OpenInNewIcon />}
                                onClick={() => handleCertificateDownload(element?._id)}
                                onDelete={() => handleCertificateDownload(element?._id)}
                                sx={{ maxWidth: '162px' }}
                              />
                            </Tooltip>
                          ))}
                        </Box>
                      )}
                    </Box>
                  ))}
                </Stack>
              ))}
            </Box>

            {/* {isAdmin ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 4,
                  mt: 3,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  color="success"
                  disabled
                  onClick={() => {
                    handleEditChange(false);
                  }}
                >
                  Approve Update
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  color="error"
                  disabled
                  onClick={() => {
                    handleEditChange(false);
                  }}
                >
                  Reject Update
                </Button>
              </Box>
            ) : null} */}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default ConnectivityDetailsView;
