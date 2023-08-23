import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { AppService } from "@client/shared/services";
import { globalStyles } from "@client/shared/constants";
import { getRCRedirectUri } from "@client/utils";
import config from "@client/config";

import style from "./style";

const defaultState = {
  open: false,
};

export default function Header({
  elements = [],
  position = "fixed",
  userData = {},
  version = {}
}) {
  const navigate = useNavigate();
  const [state, setState] = useState(defaultState);
  const { firstName = "", lastName = "", profileImageUri = "", role = [] } = userData;

  const handleDrawerClose = () => {
    setState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const handleLogout = async () => {
    const { error } = await AppService.logoutUser();
    if (error) {
      navigate("/");
    } else {
      if (typeof window !== "undefined") {
        const { rc_client_Id, rc_authorize_uri, apiBaseUrl } = config;
        window.location.replace(
          getRCRedirectUri(
            rc_authorize_uri,
            rc_client_Id,
            apiBaseUrl,
            window.location.href
          )
        );
      }
    }
  };

  return (
    <AppBar
      position={position}
      elevation={2}
      sx={{ background: '#fff' }}
    >
      <Toolbar
        sx={
          !!elements
            ? globalStyles.flex.justify.between
            : globalStyles.flex.justify.end
        }
      >
        {elements}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={profileImageUri}
            sx={globalStyles.cursor.pointer}
            onClick={() => {
              setState((prevState) => ({
                ...prevState,
                open: !prevState.open,
              }));
            }}
          />
        </Box>
        <Drawer open={state.open} onClose={handleDrawerClose} anchor="right">
          <Box sx={style.drawerPaper}>
            <Box sx={style.nameWrapper}>
              <Avatar src={profileImageUri} />
              <Box sx={style.userData}>
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  {firstName + " " + lastName}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={style.role}>Role:</Typography>
                  <Typography sx={style.role}>{role?.[0]?.name}</Typography>
                </Box>
              </Box>
            </Box>
            <MenuList>
              <MenuItem
                onClick={() => {
                  window.open("https://support.ringcentral.com", "_blank");
                }}
              >
                <ListItemText primary="Help Center" />
                <ListItemIcon sx={style.icon}>
                  <img alt="Help center" src="/assets/help-center.svg" />
                </ListItemIcon>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemText primary="Sign Out" />
                <ListItemIcon sx={style.icon}>
                  <ArrowForwardIcon fontSize="small" />
                </ListItemIcon>
              </MenuItem>
            </MenuList>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
