import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { noop } from "src/client/shared/constants";

const ConnectivityPhase2Details = ({
  phase2EncryptionAlgorithm = "",
  phase2IntegrityAlgorithm = "",
  phase2DiffleHellmanAlgorithm = "",
  phase2Lifetime = "",
  errors = {},
  handleFieldChange = noop,
}) => {
  const formFieldsConfig = [
    {
      label: "Phase 2 Encryption Algorithm",
      name: "phase2EncryptionAlgorithm",
      placeholder: "Enter Phase 2 Encryption Algorithm",
      value: phase2EncryptionAlgorithm,
      error: errors.phase2EncryptionAlgorithm,
      onChange: handleFieldChange,
    },
    {
      label: "Phase 2 Integrity Algorithm",
      name: "phase2IntegrityAlgorithm",
      placeholder: "Enter Phase 2 Integrity Algorithm",
      value: phase2IntegrityAlgorithm,
      error: errors.phase2IntegrityAlgorithm,
      onChange: handleFieldChange,
    },
    {
      label: "Phase 2 Diffie-Hellman Group",
      name: "phase2DiffleHellmanAlgorithm",
      placeholder: "Enter Phase 2 Diffie-Hellman Group",
      value: phase2DiffleHellmanAlgorithm,
      error: errors.phase2DiffleHellmanAlgorithm,
      onChange: handleFieldChange,
    },
    {
      label: "Phase 2 Lifetime",
      name: "phase2Lifetime",
      placeholder: "Enter Phase 2 Lifetime",
      value: phase2Lifetime,
      error: errors.phase2Lifetime,
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

export default ConnectivityPhase2Details;
