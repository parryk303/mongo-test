import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { noop } from "src/client/shared/constants";

const ProjectAWSDetails = ({
  crIdentifier = "",
  awsRegionMain = "",
  awsRegionBackup = "",
  crEndpointMain = "",
  crEndpointBackup = "",
	errors = {},
  handleFieldChange = noop,
}) => {
	const formFieldsConfig = [
		{
			label: "CR Identifier",
			name: "crIdentifier",
			placeholder: "Enter CR Identifier",
			value: crIdentifier,
			error: errors.crIdentifier,
			onChange: handleFieldChange,
		},
		{
			label: "AWS Region Main",
			name: "awsRegionMain",
			placeholder: "Enter AWS Region Main",
			value: awsRegionMain,
			error: errors.awsRegionMain,
			onChange: handleFieldChange,
		},
		{
			label: "AWS Region Backup",
			name: "awsRegionBackup",
			placeholder: "Enter AWS Region Backup",
			value: awsRegionBackup,
			error: errors.awsRegionBackup,
			onChange: handleFieldChange,
		},
		{
			label: "Cloud Relay Endpoint Main",
			name: "crEndpointMain",
			placeholder: "Enter Cloud Relay Endpoint Main",
			value: crEndpointMain,
			onChange: handleFieldChange,
			error: errors.crEndpointMain,
		},
		{
			label: "Cloud Relay Endpoint Backup",
			name: "crEndpointBackup",
			placeholder: "Enter Cloud Relay Endpoint Backup",
			value: crEndpointBackup,
			onChange: handleFieldChange,
			error: errors.crEndpointBackup,
		}
	];

  return (
    <>
      {" "}
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
						error={!!(field.error || "").trim()}
            name={field.name}
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

export default ProjectAWSDetails;
