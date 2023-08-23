import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { noop } from "src/client/shared/constants";

const BasicDetails = ({
  customerName = "",
  projectName = "",
  contactName = "",
  contactEmail = "",
  rcAccountId = "",
  errors = {},
  handleFieldChange = noop,
}) => {
  const formFieldsConfig = [
    {
      label: "Customer Name",
      name: "customerName",
      placeholder: "Enter Customer Name",
      required: true,
      value: customerName,
      error: errors.customerName,
      onChange: handleFieldChange,
    },
    {
      label: "Project Title",
      name: "projectName",
      placeholder: "Project Title",
      required: true,
      value: projectName,
      error: errors.projectName,
      onChange: handleFieldChange,
    },
    {
      label: "Customer Technical Contact Name",
      name: "contactName",
      placeholder: "Enter Customer Technical Contact Name",
      required: true,
      value: contactName,
      error: errors.contactName,
      onChange: handleFieldChange,
    },
    {
      label: "Customer Technical Contact Email",
      name: "contactEmail",
      placeholder: "Enter Customer Technical Contact Email",
      required: true,
      value: contactEmail,
      error: errors.contactEmail,
      onChange: handleFieldChange,
    },
    {
      label: "Ringcentral Account ID",
      name: "rcAccountId",
      placeholder: "Enter Ringcentral Account ID",
      required: true,
      value: rcAccountId,
      error: errors.rcAccountId,
      onChange: handleFieldChange,
    },
  ];

  return (
    <>
      <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>
        Project Details
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
            helperText={field.error}
            error={!!(field.error || "").trim()}
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

export default BasicDetails;
