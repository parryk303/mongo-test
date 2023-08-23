import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { noop } from "src/client/shared/constants";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const ProjectDatesDetails = ({
  requestedBuildDate = "",
  buildDate = "",
  uatStartDate = "",
  uatEndDate = "",
  expiringDate = "",
  renewalDate = "",
  currentDateField = "",
  errors = {},
  setCurrentDateField = noop,
  handleFieldChange = noop,
}) => {
  const formFieldsConfig = [
    {
      id: 1,
      label: "Request Build Date",
      name: "requestedBuildDate",
      placeholder: "Enter Request Build Date",
      value: requestedBuildDate,
      error: errors.requestedBuildDate,
      otherProps: {
        type: "date",
      },
      onChange: handleFieldChange,
    },
    {
      id: 2,
      label: "Build date",
      name: "buildDate",
      placeholder: "Enter Build date",
      value: buildDate,
      error: errors.buildDate,
      otherProps: {
        type: "date",
      },
      onChange: handleFieldChange,
    },
    {
      id: 3,
      label: "UAT Start Date",
      name: "uatStartDate",
      placeholder: "Enter UAT Start Date",
      value: uatStartDate,
      error: errors.uatStartDate,
      otherProps: {
        type: "date",
      },
      minDate: new Date(),
      onChange: handleFieldChange,
    },
    {
      id: 4,
      label: "UAT End Date",
      name: "uatEndDate",
      placeholder: "Enter UAT End Date",
      value: uatEndDate,
      error: errors.uatEndDate,
      otherProps: {
        type: "date",
      },
      minDate: new Date(),
      onChange: handleFieldChange,
    },
    {
      id: 5,
      label: "Expire Date",
      name: "expiringDate",
      placeholder: "Enter Expire Date",
      value: expiringDate,
      error: errors.expiringDate,
      otherProps: {
        type: "date",
      },
      minDate: new Date(),
      onChange: handleFieldChange,
    },
    {
      id: 6,
      label: "Renewal Date",
      name: "renewalDate",
      placeholder: "Enter Renewal Date",
      value: renewalDate,
      error: errors.renewalDate,
      otherProps: {
        type: "date",
      },
      minDate: new Date(),
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              minDate={field.minDate}
              open={currentDateField == field.id}
              label="Select date"
              inputFormat="MM/dd/yyyy"
              size="small"
              name={field.name}
              onChange={value => field.onChange({ name: field.name, value: isNaN(value) ? value : value.toISOString() })}
              value={field.value ? new Date(field.value) : null}
              onOpen={() => setCurrentDateField(field.id)}
              onClose={() => setCurrentDateField(null)}
              sx={{ width: "100%" }}
              slotProps={{
                textField: {
                  onClick: () => setCurrentDateField(field.id),
                  helperText: field.error,
                },
              }}
              renderInput={(params) => (
                <TextField {...params} sx={{ pointerEvents: "none" }} />
              )}
            />
          </LocalizationProvider>
        </Box>
      ))}
    </>
  );
};

export default ProjectDatesDetails;
