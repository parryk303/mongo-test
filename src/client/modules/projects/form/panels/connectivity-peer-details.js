import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { noop } from "src/client/shared/constants";

const ConnectivityPeerDetails = ({
  ikeVersion = "",
  deadPeerDetectionTimeout = "",
  rekeyMarginTime = "",
  rekeyFuzz = "",
  replayWindowSize = "",
  errors = {},
  handleFieldChange = noop,
}) => {
  const formFieldsConfig = [
    {
      label: "IKE Version",
      name: "ikeVersion",
      placeholder: "Enter IKE Version",
      value: ikeVersion,
      error: errors.ikeVersion,
      onChange: handleFieldChange,
    },
    {
      label: "Dead-Peer-Detection Timeout",
      name: "deadPeerDetectionTimeout",
      placeholder: "Enter Dead-Peer-Detection Timeout",
      value: deadPeerDetectionTimeout,
      error: errors.deadPeerDetectionTimeout,
      onChange: handleFieldChange,
    },
    {
      label: "Rekey Margin Time",
      name: "rekeyMarginTime",
      placeholder: "Enter Rekey Margin Time",
      value: rekeyMarginTime,
      error: errors.rekeyMarginTime,
      onChange: handleFieldChange,
    },
    {
      label: "Rekey Fuzz",
      name: "rekeyFuzz",
      placeholder: "Enter Rekey Fuzz",
      value: rekeyFuzz,
      error: errors.rekeyFuzz,
      onChange: handleFieldChange,
    },
    {
      label: "Replay Window Size",
      name: "replayWindowSize",
      placeholder: "Enter Replay Window Size",
      value: replayWindowSize,
      error: errors.replayWindowSize,
      onChange: handleFieldChange,
    },
  ];

  return (
    <>
      {" "}
      <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>
        Connectivity Details
      </Typography>
      {formFieldsConfig.map((field) => (
        <Box>
          <Typography sx={{ fontFamily: "inter_semibold" }} variant="body1">
            {field.label}
            {field.required && (
              <Typography component="span" variant="h6" color="error">
                *
              </Typography>
            )}
          </Typography>
          <TextField
            name={field.name}
            error={!!(field.error || "").trim()}
            helperText={field.error}
            fullWidth
            size="small"
            placeholder={field.placeholder}
            variant="outlined"
            value={field.value}
            onChange={field.onChange}
          />
        </Box>
      ))}
    </>
  );
};

export default ConnectivityPeerDetails;
