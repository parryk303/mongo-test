import React, { useState, useRef } from "react";
import { noop } from "@client/shared/constants";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import style from "./style";

const defaultState = {
  open: false,
};

const Dropdown = ({
  options = [],
  customToggle = null,
  classes = {},
  disabled = false,
}) => {
  const [state, setState] = useState(defaultState);
  const anchorEl = useRef(null);

  const handleOpen = () => {
    setState((prevState) => ({
      ...prevState,
      open: disabled ? false : !prevState.open,
    }));
  };

  const handleSelection = (callback = noop) => {
    setState((prevState) => ({
      ...prevState,
      open: false,
    }));
    callback();
  };

  return (
    <>
      <Box
        ref={anchorEl}
        onClick={handleOpen}
        sx={disabled ? style.disabled : {}}
      >
        {customToggle ? (
          customToggle
        ) : (
          <IconButton>
            <MoreVertIcon sx={classes.moreIcon} />
          </IconButton>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl.current}
        open={state.open}
        onClose={handleOpen}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        PaperProps={{ style: classes.menu }}
        sx={classes.list}
      >
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => handleSelection(option.onClick)}>
            {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
            <ListItemText>{option.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Dropdown;
