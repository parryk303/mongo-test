import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { noop } from "src/client/shared/constants";

const ConnectivityNetworkDetails = ({
  mainPublicIps = [],
  backupVPNPeers = [],
  internalNetworkCIDR = "",
  customerVPNGatewayMakeModel = "",
  vpnGatewaySoftwareVersion = "",
  errors = {},
  handleFieldChange = noop,
}) => {
  const formFieldsConfig = [
    {
      label: "Main Public IPs",
      name: "mainPublicIps",
      placeholder: "Enter Main Public IPs and enter",
      value: mainPublicIps,
      error: errors.mainPublicIps,
      options: [],
      multipleFreeSolo: true,
      onChange: handleFieldChange,
    },
    {
      label: "Backup VPN Peers",
      name: "backupVPNPeers",
      placeholder: "Enter Backup VPN Peers and enter",
      value: backupVPNPeers,
      error: errors.backupVPNPeers,
      options: [],
      multipleFreeSolo: true,
      onChange: handleFieldChange,
    },
    {
      label: "Internal Network CIDR",
      name: "internalNetworkCIDR",
      placeholder: "Enter Internal Network CIDR",
      value: internalNetworkCIDR,
      error: errors.internalNetworkCIDR,
      onChange: handleFieldChange,
    },
    {
      label: "Customer VPN Gateway Make/Model",
      name: "customerVPNGatewayMakeModel",
      placeholder: "Enter Customer VPN Gateway Make/Model",
      value: customerVPNGatewayMakeModel,
      error: errors.customerVPNGatewayMakeModel,
      onChange: handleFieldChange,
    },
    {
      label: "VPN Gateway Software Version",
      name: "vpnGatewaySoftwareVersion",
      placeholder: "Enter VPN Gateway Software Version",
      value: vpnGatewaySoftwareVersion,
      error: errors.vpnGatewaySoftwareVersion,
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
          {field.multipleFreeSolo ? (
            <Autocomplete
              multiple
              freeSolo
              size="small"
              value={field.value}
              options={field.options}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={field.error}
                  error={!!(field.error || "").trim()}
                  placeholder={field.placeholder}
                />
              )}
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
            />
          )}
        </Box>
      ))}
    </>
  );
};

export default ConnectivityNetworkDetails;
