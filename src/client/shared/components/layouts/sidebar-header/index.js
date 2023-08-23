import React from "react";
import Box from "@mui/material/Box";
import Header from "../../header";
import Subheader from "../../sub-header";

const SidebarHeader = ({
  userData = {},
  version = {},
  children = <></>,
  subHeaderList = [],
}) => {
  return (
    <Box>
      <Header
        userData={userData}
        version={version}
        elements={
          <Box sx={{ cursor: "pointer" }}>
            <img
              onClick={() => window.location.replace("/")}
              src="/assets/brand-logo.svg"
              height="28px"
              alt="Ringcentral Logo"
            />
          </Box>
        }
      />
      <Subheader subHeaderList={subHeaderList} />
      {children}
    </Box>
  );
};

export default SidebarHeader;
