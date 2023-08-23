import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { noop } from "@client/shared/constants";
import format from "date-fns/format";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import style from "./style";

const ProjectDetailsView = ({
  entries = [],
  isEdit = false,
  handleEditProjectDetails = noop,
}) => {
  const navigate = useNavigate();
  return (
    <>
     <Box sx ={{ ml: 4 }}>
          <IconButton onClick={() => navigate(-1)}>
            <KeyboardBackspaceIcon sx={{ fontSize: 36 }} />
          </IconButton>
        </Box>
      <Box>
        <Typography
          sx={{
            mt: 4,
            mb: 2,
            display: "flex",
            justifyContent: "center",
            fontFamily: "inter_semibold",
          }}
          variant="h4"
        >
          Project Details
        </Typography>
        <Paper
          sx={{ padding: "48px", width: "76%", margin: "auto" }}
          elevation={2}
        >
          {/* <Box sx={{ display: "flex", justifyContent: "end", padding: "16px" }}>
            {!isEdit && (
              <Button
                onClick={handleEditProjectDetails}
                variant="contained"
                color="secondary"
              >
                Edit
              </Button>
            )}
          </Box> */}
          <Box sx={{ display: "flex", gap: "72px" }}>
            {entries.map((item) => {
              return (
                <>
                  <Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "inter_semibold" }}
                      >
                        Customer Name
                      </Typography>
                      <Typography sx={style.textColor} variant="body2">
                        {item.customerName || "-"}
                      </Typography>
                    </Box>
                    <Box sx={style.topmargin}>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "inter_semibold" }}
                      >
                        Customer Technical Contacts
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <Avatar alt="Remy Sharp" src="" />
                        <Box>
                          <Typography sx={style.textColor} variant="body2">
                            {item.customerContactName}
                          </Typography>
                          <Typography sx={style.textColor} variant="body2">
                            {item.customerContactEmail}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={style.topmargin}>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "inter_semibold" }}
                      >
                        Client Partner
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <Avatar alt="Remy Sharp" src="" />
                        <Box>
                          <Typography sx={style.textColor} variant="body2">
                            {"-"}
                          </Typography>
                          <Typography sx={style.textColor} variant="body2">
                            {"-"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={style.topmargin}>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "inter_semibold" }}
                      >
                        Project Manager
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <Avatar alt="Remy Sharp" src="" />
                        <Box>
                          <Typography sx={style.textColor} variant="body2">
                            {"-"}
                          </Typography>
                          <Typography sx={style.textColor} variant="body2">
                            {"-"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={style.topmargin}>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "inter_semibold" }}
                      >
                        Implementation Manager
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <Avatar alt="Remy Sharp" src="" />
                        <Box>
                          <Typography sx={style.textColor} variant="body2">
                            {"-"}
                          </Typography>
                          <Typography sx={style.textColor} variant="body2">
                            {"-"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={style.topmargin}>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "inter_semibold" }}
                      >
                        Description of Integration
                      </Typography>
                      <Typography sx={style.textColor} variant="body2">
                        {item.projectDetails[0]?.description}
                      </Typography>
                    </Box>
                  </Box>
                </>
              );
            })}
            {(entries[0]?.projectDetails || []).map((item) => {
              return (
                <>
                  <Box>
                    <Box
                      sx={
                        isEdit
                          ? {
                              ...style.subHeading,
                              fontFamily: "inter_semibold",
                            }
                          : { fontFamily: "inter_semibold" }
                      }
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "inter_semibold" }}
                      >
                        Site To Site VPN
                      </Typography>
                      <Typography sx={style.textColor} variant="body2">
                        {item.siteToSiteVPN ? "Yes" : "No"}
                      </Typography>
                    </Box>
                    <Box sx={style.topmargin}>
                      <Typography
                        sx={
                          isEdit
                            ? {
                                ...style.subHeading,
                                fontFamily: "inter_semibold",
                              }
                            : { fontFamily: "inter_semibold" }
                        }
                        variant="h6"
                      >
                        Dev/Test Endpoints
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {isEdit && (
                          <BorderColorOutlinedIcon sx={{ fontSize: "16px" }} />
                        )}
                        <Typography sx={style.textColor} variant="body2">
                          {item.devTestEndpoint[0] || ""}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {isEdit && (
                          <BorderColorOutlinedIcon sx={{ fontSize: "16px" }} />
                        )}
                        <Typography sx={style.textColor} variant="body2">
                          {item.devTestEndpoint[1] || ""}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={style.topmargin}>
                      <Typography
                        sx={
                          isEdit
                            ? {
                                ...style.subHeading,
                                fontFamily: "inter_semibold",
                              }
                            : { fontFamily: "inter_semibold" }
                        }
                        variant="h6"
                      >
                        Production Endpoints
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {isEdit && (
                          <BorderColorOutlinedIcon sx={{ fontSize: "16px" }} />
                        )}
                        <Typography sx={style.textColor} variant="body2">
                          {item.productionEndpoint[0] || ""}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {isEdit && (
                          <BorderColorOutlinedIcon sx={{ fontSize: "16px" }} />
                        )}
                        <Typography sx={style.textColor} variant="body2">
                          {item.productionEndpoint[1] || ""}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={style.topmargin}>
                      <Typography
                        sx={
                          isEdit
                            ? {
                                ...style.subHeading,
                                fontFamily: "inter_semibold",
                              }
                            : { fontFamily: "inter_semibold" }
                        }
                        variant="h6"
                      >
                        Application Credential
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {isEdit && (
                          <BorderColorOutlinedIcon sx={{ fontSize: "16px" }} />
                        )}
                        <Typography sx={style.textColor} variant="body2">
                          {item.applicationCredentials || ""}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={style.topmargin}>
                      <Typography
                        sx={
                          isEdit
                            ? {
                                ...style.subHeading,
                                fontFamily: "inter_semibold",
                              }
                            : { fontFamily: "inter_semibold" }
                        }
                        variant="h6"
                      >
                        Create Date
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {isEdit && (
                          <BorderColorOutlinedIcon sx={{ fontSize: "16px" }} />
                        )}

                        <Typography sx={style.textColor} variant="body2">
                          {(item.createdAt &&
                            format(new Date(item.createdAt), "MM-dd-yyyy")) ||
                            ""}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={style.topmargin}>
                      <Typography
                        sx={
                          isEdit
                            ? {
                                ...style.subHeading,
                                fontFamily: "inter_semibold",
                              }
                            : { fontFamily: "inter_semibold" }
                        }
                        variant="h6"
                      >
                        Last Modified Date
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {isEdit && (
                          <BorderColorOutlinedIcon sx={{ fontSize: "16px" }} />
                        )}

                        <Typography sx={style.textColor} variant="body2">
                          {(item.updatedAt &&
                            format(new Date(item.updatedAt), "MM-dd-yyyy")) ||
                            ""}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={style.topmargin}>
                      <Typography
                        sx={
                          isEdit
                            ? {
                                ...style.subHeading,
                                fontFamily: "inter_semibold",
                              }
                            : { fontFamily: "inter_semibold" }
                        }
                        variant="h6"
                      >
                        Request Build Date
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {isEdit && (
                          <BorderColorOutlinedIcon sx={{ fontSize: "16px" }} />
                        )}

                        <Typography sx={style.textColor} variant="body2">
                          {(item.requestedBuildDate &&
                            format(
                              new Date(item.requestedBuildDate),
                              "MM-dd-yyyy"
                            )) ||
                            ""}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <Box>
                      <Typography
                        sx={
                          isEdit
                            ? {
                                ...style.subHeading,
                                fontFamily: "inter_semibold",
                              }
                            : { fontFamily: "inter_semibold" }
                        }
                        variant="h6"
                      >
                        Build Date
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {isEdit && (
                          <BorderColorOutlinedIcon sx={{ fontSize: "16px" }} />
                        )}

                        <Typography sx={style.textColor} variant="body2">
                          {(item.buildDate &&
                            format(new Date(item.buildDate), "MM-dd-yyyy")) ||
                            ""}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={style.topmargin}>
                      <Typography
                        sx={
                          isEdit
                            ? {
                                ...style.subHeading,
                                fontFamily: "inter_semibold",
                              }
                            : { fontFamily: "inter_semibold" }
                        }
                        variant="h6"
                      >
                        UAT Start Date
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {isEdit && (
                          <BorderColorOutlinedIcon sx={{ fontSize: "16px" }} />
                        )}

                        <Typography sx={style.textColor} variant="body2">
                          {(item.uatStartDate &&
                            format(
                              new Date(item.uatStartDate),
                              "MM-dd-yyyy"
                            )) ||
                            ""}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={style.topmargin}>
                      <Typography
                        sx={
                          isEdit
                            ? {
                                ...style.subHeading,
                                fontFamily: "inter_semibold",
                              }
                            : { fontFamily: "inter_semibold" }
                        }
                        variant="h6"
                      >
                        UAT End Date
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {isEdit && (
                          <BorderColorOutlinedIcon sx={{ fontSize: "16px" }} />
                        )}

                        <Typography sx={style.textColor} variant="body2">
                          {(item.uatEndDate &&
                            format(new Date(item.uatEndDate), "MM-dd-yyyy")) ||
                            ""}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={style.topmargin}>
                      <Typography
                        sx={
                          isEdit
                            ? {
                                ...style.subHeading,
                                fontFamily: "inter_semibold",
                              }
                            : { fontFamily: "inter_semibold" }
                        }
                        variant="h6"
                      >
                        Expiry Date
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {isEdit && (
                          <BorderColorOutlinedIcon sx={{ fontSize: "16px" }} />
                        )}

                        <Typography sx={style.textColor} variant="body2">
                          {(item.expiringDate &&
                            format(
                              new Date(item.expiringDate),
                              "MM-dd-yyyy"
                            )) ||
                            ""}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={style.topmargin}>
                      <Typography
                        sx={
                          isEdit
                            ? {
                                ...style.subHeading,
                                fontFamily: "inter_semibold",
                              }
                            : { fontFamily: "inter_semibold" }
                        }
                        variant="h6"
                      >
                        Renewal Date
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {isEdit && (
                          <BorderColorOutlinedIcon sx={{ fontSize: "16px" }} />
                        )}

                        <Typography sx={style.textColor} variant="body2">
                          {(item.renewalDate &&
                            format(new Date(item.renewalDate), "MM-dd-yyyy")) ||
                            ""}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={style.topmargin}>
                      <Typography
                        sx={
                          isEdit
                            ? {
                                ...style.subHeading,
                                fontFamily: "inter_semibold",
                              }
                            : { fontFamily: "inter_semibold" }
                        }
                        variant="h6"
                      >
                        Cr Identifier
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {isEdit && (
                          <BorderColorOutlinedIcon sx={{ fontSize: "16px" }} />
                        )}
                        <Typography sx={style.textColor} variant="body2">
                          {item.crIdentifier || ""}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={style.topmargin}>
                      <Typography
                        sx={
                          isEdit
                            ? {
                                ...style.subHeading,
                                fontFamily: "inter_semibold",
                              }
                            : { fontFamily: "inter_semibold" }
                        }
                        variant="h6"
                      >
                        AWS Region Main
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {isEdit && (
                          <BorderColorOutlinedIcon sx={{ fontSize: "16px" }} />
                        )}
                        <Typography sx={style.textColor} variant="body2">
                          {item.awsRegionMain || ""}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={style.topmargin}>
                      <Typography
                        sx={
                          isEdit
                            ? {
                                ...style.subHeading,
                                fontFamily: "inter_semibold",
                              }
                            : { fontFamily: "inter_semibold" }
                        }
                        variant="h6"
                      >
                        AWS Region Backup
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {isEdit && (
                          <BorderColorOutlinedIcon sx={{ fontSize: "16px" }} />
                        )}
                        <Typography sx={style.textColor} variant="body2">
                          {item.awsRegionBackup || ""}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <Box sx={style.subHeading}>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "inter_semibold" }}
                      >
                        Cloud Relay Endpoints Main
                      </Typography>
                      <Typography sx={style.textColor} variant="body2">
                        {item.crEndpointMain || ""}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        ...style.topmargin,
                        ...style.subHeading,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "inter_semibold" }}
                      >
                        Cloud Relay Endpoints Backup
                      </Typography>
                      <Typography sx={style.textColor} variant="body2">
                        {item.crEndpointBackup || ""}
                      </Typography>
                    </Box>
                  </Box>
                </>
              );
            })}
          </Box>
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "12px",
            }}
          >
            {isEdit && (
              <Button variant="contained" color="secondary">
                Request Update
              </Button>
            )}
          </Box> */}
        </Paper>
      </Box>
    </>
  );
};

export default ProjectDetailsView;
