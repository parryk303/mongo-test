import { noop } from "@client/shared/constants";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import style from "./style";

export default function ComingSoon({ isOpen = false, handleClose = noop }) {
  return (
    <Dialog open={isOpen} onClose={() => handleClose(false)}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          p: 1,
        }}
      >
        <IconButton size="small" sx={{ textAlign: "end" }}>
          <CloseIcon onClick={() => handleClose(false)} fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          minWidth: "350px",
          minHeight: "120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "primary.dark", fontWeight: "medium" }}
        >
          Coming Soon...
        </Typography>
      </DialogContent>
      <DialogActions>
        <Box sx={{ p: 2, mt: 3 }}>
          <Button variant="contained" onClick={() => handleClose(false)}>
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
