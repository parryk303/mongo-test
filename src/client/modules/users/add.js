import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { noop } from "src/client/shared/constants";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

const AddUser = ({
  isDialogOpen = false,
  details = {},
  roles = [],
  jobTitles = [],
  isValidated = false,
  errors = {},
  isButtonLoading = false,
  handleDialogOpen = noop,
  handleUserDetails = noop,
  handleChange = noop,
}) => {
  const fields = [
    {
      name: "roleId",
      label: "Role",
      type: "select",
      options: roles.map((option) => ({
        value: option._id,
        label: option.name,
      })),
    },
    {
      name: "firstName",
      label: "First Name",
      type: "text",
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
    },
    {
      name: "companyName",
      label: "Company Name",
      type: "text",
    },
    {
      name: "email",
      label: "Work Email",
      type: "text",
    },
    {
      name: "jobTitleId",
      label: "Job Title",
      type: "select",
      options: jobTitles.map((option) => ({
        value: option._id,
        label: option.name,
      })),
    },
  ];

  return (
    <Dialog
      fullWidth
      open={isDialogOpen}
      onClose={() => handleDialogOpen(false)}
      elevation={8}
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: 400,
          borderRadius: 4,
          p: 2,
        },
      }}
    >
      <DialogActions>
        <IconButton size="small" onClick={() => handleDialogOpen(false)}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
      <DialogTitle sx={{ mt: -6 }}>
        <Typography
          sx={{ fontFamily: "inter_semibold" }}
          variant="h4"
          align="center"
        >
          New User
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stack sx={{ mt: 2 }}>
          {fields.map((field) => (
            <FormControl key={field.name}>
              {!details[field.name] ? (
                <InputLabel>{`${field.label} *`}</InputLabel>
              ) : null}
              {field.type === "select" ? (
                <TextField
                  fullWidth
                  select
                  name={field.name}
                  value={details[field.name]}
                  error={!!errors[field.name]?.trim()}
                  helperText={errors[field.name] || " "}
                  onChange={handleChange}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  fullWidth
                  name={field.name}
                  placeholder={`${field.label} *`}
                  variant="outlined"
                  value={details[field.name]}
                  error={!!errors[field.name]?.trim()}
                  helperText={errors[field.name] || " "}
                  onChange={handleChange}
                />
              )}
            </FormControl>
          ))}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 6 }}>
        <Button
          variant="contained"
          type="submit"
          size="large"
          fullWidth
          onClick={() => handleUserDetails(details)}
          sx={{ py: 3 }}
          disabled={isValidated || isButtonLoading}
        >
          {isButtonLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Submit"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUser;
