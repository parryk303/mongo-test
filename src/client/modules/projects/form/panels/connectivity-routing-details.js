import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { noop } from "src/client/shared/constants";

const ConnectivityRoutingDetails = ({
  routingMethods = "",
  desiredRCsideCIDRs = [],
  customerVPNPeerIps = [],
  vpnAuthentication = [],
  preferredFileExchangeMethod = "",
  errors = {},
  handleFieldChange = noop,
}) => {
  const formFieldsConfig = [
    {
      label: "Routing Methods",
      name: "routingMethods",
      placeholder: "Enter Routing Methods",
      value: routingMethods,
      error: errors.routingMethods,
      onChange: handleFieldChange,
    },
    {
      label: "Desired RingCentral-side/27 CIDRs",
      name: "desiredRCsideCIDRs",
      placeholder: "Enter Desired RingCentral-side/27 CIDRs and enter",
      value: desiredRCsideCIDRs,
      error: errors.desiredRCsideCIDRs,
      options: [],
      multipleFreeSolo: true,
      onChange: handleFieldChange,
    },
    {
      label: "Customer VPN Peer IPs",
      name: "customerVPNPeerIps",
      placeholder: "Enter Customer VPN Peer IPs and enter",
      value: customerVPNPeerIps,
      error: errors.customerVPNPeerIps,
      options: [],
      multipleFreeSolo: true,
      onChange: handleFieldChange,
    },
    {
      label: "VPN Authentication (PSK/RSA)",
      name: "vpnAuthentication",
      placeholder: "Enter VPN Authentication (PSK/RSA) and enter",
      value: vpnAuthentication,
      error: errors.vpnAuthentication,
      options: [],
      multipleFreeSolo: true,
      onChange: handleFieldChange,
    },
    {
      label: "Preffered File Exchange Method",
      name: "preferredFileExchangeMethod",
      placeholder: "Enter Preffered File Exchange Method",
      value: preferredFileExchangeMethod,
      error: errors.preferredFileExchangeMethod,
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
                  error={!!(field.error || "").trim()}
                  helperText={field.error}
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
              error={!!(field.error || "").trim()}
              helperText={field.error}
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

export default ConnectivityRoutingDetails;
