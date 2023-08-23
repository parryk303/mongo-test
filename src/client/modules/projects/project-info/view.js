import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { noop, globalStyles } from "@client/shared/constants";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import style from "./style";

const ProjectInfoView = ({
  projectInfo = [],
  handleNavigate = noop,
  handleDownload = noop,
  entries = {},
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Box>
        <Box sx ={{ ml: 4 }}>
          <IconButton onClick={() => navigate(-1)}>
            <KeyboardBackspaceIcon sx={{ fontSize: 36 }} />
          </IconButton>
        </Box>
        <Box>
          <Typography sx={style.heading} variant="h4">
            {entries.customerName} {entries.projectName}{" "}
          </Typography>
          <Paper
            sx={{
              padding: "60px",
              width: "60%",
              margin: "auto",
              marginTop:"26px"
            }}
            elevation={2}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                {(projectInfo.projectInfoData || []).map((item) => {
                  return (
                    <>
                      <Box
                        sx={
                          (item.heading || "").toLowerCase() ===
                            "project status" ||
                          (item.heading || "").toLowerCase() ===
                            "health status" ||
                          (item.heading || "").toLowerCase() ===
                            "contact info" ||
                          (item.heading || "").toLowerCase() ===
                            "postman collection"
                            ? {
                                display: "flex",
                                gap: "24px",
                                marginTop: "72px",
                                cursor: "default",
                                pointerEvents: "none",
                              }
                            : {
                                display: "flex",
                                gap: "24px",
                                marginTop: "72px",
                                cursor: "pointer",
                              }
                        }
                        onClick={() =>
                          (item.heading || "").toLowerCase() ===
                          "postman collection"
                            ? handleDownload("postman")
                            : handleNavigate(item.to)
                        }
                      >
                        <Box sx={{ marginTop: "6px" }}>{item.icon}</Box>
                        <Box>
                          <Typography sx={{ fontWeight: "bold" }} variant="h6">
                            {item.heading}
                          </Typography>
                          <Typography
                            sx={{
                              ...globalStyles.text.color.disabled,
                              width: "250px",
                            }}
                            variant="body2"
                          >
                            {item.description}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            marginLeft: "80px",
                          }}
                        >
                          <Box>
                            {item.status && item.status !== "Download" ? (
                              <FiberManualRecordIcon
                                sx={{
                                  fontSize: "12px",
                                  marginRight: "4px",
                                  color: `${
                                    item.status === "Deployed"
                                      ? "rgb(83,155,254)"
                                      : item.status === "Pending"
                                      ? "rgb(251,140,0)"
                                      : item.status === "In Progress"
                                      ? "rgb(207,250,244)"
                                      : "rgb(228,79,55)"
                                  }
                                `,
                                }}
                              />
                            ) : item.status === "Download" ? (
                              <FileDownloadOutlinedIcon
                                sx={{
                                  ...globalStyles.text.color.disabled,
                                }}
                                fontSize="medium"
                              />
                            ) : (
                              ""
                            )}
                          </Box>

                          <Typography
                            sx={{
                              ...globalStyles.text.color.disabled,
                            }}
                            variant="body2"
                          >
                            {item.status}
                          </Typography>
                        </Box>
                          
                      </Box>
                    </>
                  );
                })}
              </Box>
              <Box>
                {(projectInfo.projectsData || []).map((item) => {
                  return (
                    <>
                      <Box
                        sx={
                          (item.heading || "").toLowerCase() ===
                            "project requests" 
                            ? {
                                display: "flex",
                                gap: "24px",
                                marginTop: "72px",
                                cursor: "default",
                                pointerEvents: "none",
                              }
                            : {
                                display: "flex",
                                gap: "24px",
                                marginTop: "72px",
                                cursor: "pointer",
                              }
                        }
                        onClick={() =>
                          (item.heading || "").toLowerCase() === "sow"
                            ? handleDownload("sow")
                            : handleNavigate(item.to || "")
                        }
                      >
                        <Box sx={{ marginTop: "6px" }}>{item.icon}</Box>
                        <Box>
                          <Typography sx={{ fontWeight: "bold" }} variant="h6">
                            {item.heading}
                          </Typography>
                          <Typography
                            sx={{
                              ...globalStyles.text.color.disabled,
                              width: "250px",
                            }}
                            variant="body2"
                          >
                            {item.description}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  );
                })}
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ProjectInfoView;
