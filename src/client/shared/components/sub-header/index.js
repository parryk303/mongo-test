import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import style from "./style";

export default function Subheader({ subHeaderList = [] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const isItemSelected = (itemRoute) => {
    let isSelected = false;
    if (currentPath === `${itemRoute}` || currentPath === `${itemRoute}/`) {
      isSelected = true;
    }
    return isSelected;
  };
  return (
    <Box sx={style.subHeaderContainer}>
      {subHeaderList.map((item, index) => {
        return (
          <Typography
            key={index}
            sx={{
              cursor: item.isDisabled ? "auto" : "pointer",
              color: item.isDisabled && "grey.500",
              fontFamily: 'inter_regular',
              ...(isItemSelected(item.to) && style.subHeaderItemActive),
            }}
            onClick={() => !item.isDisabled && navigate(`${item.to}`)}
          >
            {item.label}
          </Typography>
        );
      })}
    </Box>
  );
}
