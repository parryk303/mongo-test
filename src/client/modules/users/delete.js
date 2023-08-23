import Box from "@mui/material/Box";

import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { noop } from "src/client/shared/constants";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const DeleteUser = ({
  isDeleting = false,
  rowId = "",
  handleDeleteDialog = noop,
  handleDeleteUser = noop,
}) => {
  return (
    <Dialog
      open={isDeleting}
      onClose={() => handleDeleteDialog(false)}
      sx={{
        "& .MuiDialog-paper": {
          height: 200,
          width: 450
        },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ fontFamily: "inter_semibold"}}>Delete User</Typography>
          <IconButton size="small" onClick={() => handleDeleteDialog(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ fontFamily: "inter_semibold"}}>Are you sure you want to delete this user?</Typography>
      </DialogContent>
      <DialogActions>
        <Box sx={{ m: 2 }}>
          <Button
            size="small"
            onClick={() => handleDeleteDialog(false)}
            variant="outlined"
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => handleDeleteUser(rowId)}
            color="error"
          >
            Delete
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUser;
