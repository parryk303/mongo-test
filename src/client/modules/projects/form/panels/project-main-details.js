import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { noop } from "src/client/shared/constants";
import Chip from "@mui/material/Chip";

const ProjectMainDetails = ({
  siteToSiteVPN = "",
  devTestEndpoint = [],
  productionEndpoint = [],
  applicationCredentials = "",
  description = "",
  siteToSiteVPNList = [],
  errors = {},
  handleFieldChange = noop,
}) => {
  const formFieldsConfig = [
    {
      label: "Site To Site VPN",
      name: "siteToSiteVPN",
      placeholder: "Select Site To Site VPN",
      required: true,
      options: siteToSiteVPNList,
      value: siteToSiteVPN,
      error: errors.siteToSiteVPN,
      onChange: handleFieldChange,
      required: true,
    },
    {
      label: "Dev/Test Endpoints",
      name: "devTestEndpoint",
      placeholder: "Enter Dev/Test Endpoints and press enter",
      value: devTestEndpoint,
      error: errors.devTestEndpoint,
      freeSolo: true,
      multiple: true,
      options: [],
      onChange: handleFieldChange,
    },
    {
      label: "Production Endpoints",
      name: "productionEndpoint",
      placeholder: "Enter Production Endpoints and press enter",
      value: productionEndpoint,
      error: errors.productionEndpoint,
      freeSolo: true,
      multiple: true,
      options: [],
      onChange: handleFieldChange,
    },
    {
      label: "Application Credentials",
      name: "applicationCredentials",
      placeholder: "Enter Application Credentials",
      value: applicationCredentials,
      error: errors.applicationCredentials,
      onChange: handleFieldChange,
    },
    {
      label: "Description of Integration",
      name: "description",
      placeholder: "Enter Description",
     
      value: description,
      error: errors.description,
      otherProps: {
        multiline: true,
        rows: 3,
      },
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
          {(field.options || field.freeSolo) ? (
            <Autocomplete
              freeSolo={field.freeSolo}
              multiple={field.multiple}
              fullWidth
              disablePortal
              disableClearable
              size="small"
              value={field.value}
              options={field.options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={field.error}
                  error={!!(field.error || "").trim()}
                  placeholder={field.placeholder}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              onChange={(_, value) =>
                handleFieldChange({ name: field.name, value })
              }
            />
          ) : (
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
              {...(field.otherProps || {})}
            />
          )}
        </Box>
      ))}
    </>
  );
};

export default ProjectMainDetails;
