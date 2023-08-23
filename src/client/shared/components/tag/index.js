import React from "react";
import Typography from "@mui/material/Typography";
import { globalStyles } from "@client/shared/constants";
import Box from "@mui/material/Box";
import style from "./style";
const Tag = ({
  classes: passedClasses = {},
  className = "",
  color = "primary",
  icon = <></>,
  label = "Tag",
  onClick = () => {},
  shade = "main",
  size = "large",
}) => {
  return (
    <Box
      sx={{
        ...className,
        ...passedClasses.root,
        ...style.root,
        ...(globalStyles.background.color[color]
          ? globalStyles.background.color[color][shade]
          : { backgroundColor: color }),
      }}
      onClick={onClick}
    >
      {icon && icon}
      <Typography
        sx={{ ...passedClasses.label, ...style.label }}
        variant="caption"
      >
        {label}
      </Typography>
    </Box>
  );
};

export default Tag;
