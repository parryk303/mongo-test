import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { noop } from "src/client/shared/constants";

const ConnectivityPhaseDetails = ({
  phase1EncryptionAlgorithm = "",
  phase1IntegrityAlgorithm = "",
  phase1DiffleHellmanAlgorithm = "",
  phase1Lifetime = "",
  errors = {},
  handleFieldChange = noop,
}) => {
  const formFieldsConfig = [
    {
      label: "Phase 1 Encryption Algorithm",
      name: "phase1EncryptionAlgorithm",
      placeholder: "Enter Phase 1 Encryption Algorithm",
      value: phase1EncryptionAlgorithm,
      error: errors.phase1EncryptionAlgorithm,
      onChange: handleFieldChange,
    },
    {
      label: "Phase 1 Integrity Algorithm",
      name: "phase1IntegrityAlgorithm",
      placeholder: "Enter Phase 1 Integrity Algorithm",
      value: phase1IntegrityAlgorithm,
      error: errors.phase1IntegrityAlgorithm,
      onChange: handleFieldChange,
    },
    {
      label: "Phase 1 Diffie-Hellman Group",
      name: "phase1DiffleHellmanAlgorithm",
      placeholder: "Enter Phase 1 Diffie-Hellman Group",
      value: phase1DiffleHellmanAlgorithm,
      error: errors.phase1DiffleHellmanAlgorithm,
      onChange: handleFieldChange,
    },
    {
      label: "Phase 1 Lifetime",
      name: "phase1Lifetime",
      placeholder: "Enter Phase 1 Lifetime",
      value: phase1Lifetime,
      error: errors.phase1Lifetime,
      onChange: handleFieldChange,
    },
  ];

  return (
    <>
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

export default ConnectivityPhaseDetails;
