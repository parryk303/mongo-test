import { noop } from "src/client/shared/constants";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import Skeleton from "@mui/material/Skeleton";

const AdvanceDetails = ({
  isCertificateSaving = false,
  isSOWSaving = false,
  messageTransformation = "",
  messageTransformationOther = "",
  messageCertificate = "",
  connectivityType = "",
  connectivityTypeOther = "",
  sow = "",
  selectedSOWFile = null,
  selectedCertificates = [],
  messageCertificateList = [],
  messageTransformationList = [],
  contectivityTypeList = [],
  isButtonloading = '',
  errors = {},
  handleFieldChange = noop,
  handleCertificateSelection = noop,
  handleSOWFileSelection = noop,
  handleDeleteCertificate = noop,
}) => {
  return (
    <>
      <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>
        Connectivity Details
      </Typography>
      <Box>
        <Typography sx={{ fontFamily: "inter_semibold" }} variant="body1">
          Message Transformation{" "}
          <Typography component="span" variant="h6" color="error">
            *
          </Typography>
        </Typography>
        <Autocomplete
          fullWidth
          disablePortal
          disableClearable
          size="small"
          value={messageTransformation}
          options={messageTransformationList}
          renderInput={(params) => (
            <TextField
              {...params}
              helperText={errors.messageTransformation}
              error={!!(errors.messageTransformation || "").trim()}
              placeholder="Select Message Transformation"
            />
          )}
          onChange={(_, value) =>
            handleFieldChange({ name: "messageTransformation", value })
          }
        />
        {messageTransformation.value == "other" && (
          <Box>
            <Typography sx={{ fontFamily: "inter_semibold" }} variant="body2">
              Please Specify
              <Typography component="span" variant="h6" color="error">
                *
              </Typography>
            </Typography>
            <TextField
              name="messageTransformationOther"
              helperText={errors.messageTransformationOther}
              error={!!(errors.messageTransformationOther || "").trim()}
              fullWidth
              size="small"
              placeholder="Enter Message Transformation"
              variant="outlined"
              value={messageTransformationOther}
              onChange={handleFieldChange}
            />
          </Box>
        )}
      </Box>

      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontFamily: "inter_semibold" }} variant="body1">
            Message Certificate{" "}
            <Typography component="span" variant="h6" color="error">
              *
            </Typography>
          </Typography>{" "}
          {messageCertificate.value && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="caption" sx={{ mx: 3 }}>
                Upload certificate here
              </Typography>
              <input
                style={{ display: "none" }}
                id="certificate-input-field"
                type="file"
                onChange={handleCertificateSelection}
                onClick={(evt) => (evt.currentTarget.value = "")}
                multiple
              />
              {isCertificateSaving ? (
                <IconButton disabled>
                  <CircularProgress size={18} color="inherit" />
                </IconButton>
              ) : (
                <IconButton component="label" htmlFor="certificate-input-field">
                  <CloudUploadOutlinedIcon />
                </IconButton>
              )}
            </Box>
          )}
        </Box>
        {isCertificateSaving ? (
          <>
            <Skeleton height={60} />
            <Box />
          </>
        ) : (
          <Autocomplete
            fullWidth
            disablePortal
            disableClearable
            size="small"
            value={messageCertificate}
            options={messageCertificateList}
            renderInput={(params) => (
              <TextField
                {...params}
                helperText={errors.messageCertificate}
                error={!!(errors.messageCertificate || "").trim()}
                placeholder="Select Message Certificate"
              />
            )}
            onChange={(_, value) =>
              handleFieldChange({ name: "messageCertificate", value })
            }
          />
        )}

        {(!!selectedCertificates.length && !isCertificateSaving) &&
          selectedCertificates.map((certificate) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1,
                }}
              >
                <Typography variant="subtitle2" noWrap>
                  {certificate.name}
                </Typography>
                {(isButtonloading !== certificate.id) ? (
                  <IconButton
                    onClick={() => handleDeleteCertificate(certificate.id)}
                  >
                    <ClearIcon color="error" />
                  </IconButton>
                ) : (
                  <IconButton disabled>
                    <CircularProgress size={20} color="inherit" />
                  </IconButton>
                )}
              </Box>
            );
          })}
      </Box>
      <Box>
        <Typography sx={{ fontFamily: "inter_semibold" }} variant="body1">
          Connectivity Type
          <Typography component="span" variant="h6" color="error">
            *
          </Typography>
        </Typography>
        <Autocomplete
          fullWidth
          disablePortal
          disableClearable
          size="small"
          value={connectivityType}
          getOptionLabel={(option) => option?.name || ""}
          options={contectivityTypeList}
          renderInput={(params) => (
            <TextField
              {...params}
              helperText={errors.connectivityType}
              error={!!(errors.connectivityType || "").trim()}
              placeholder="Select Connectivity Type"
            />
          )}
          onChange={(_, value) =>
            handleFieldChange({ name: "connectivityType", value })
          }
        />
        {connectivityType.name == "Other" && (
          <Box>
            <Typography sx={{ fontFamily: "inter_semibold" }} variant="body2">
              Please Specify
              <Typography component="span" variant="h6" color="error">
                *
              </Typography>
            </Typography>
            <TextField
              name="connectivityTypeOther"
              helperText={errors.connectivityTypeOther}
              error={!!(errors.connectivityTypeOther || "").trim()}
              fullWidth
              size="small"
              placeholder="Enter Connectivity Type"
              variant="outlined"
              value={connectivityTypeOther}
              onChange={handleFieldChange}
            />
          </Box>
        )}
      </Box>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontFamily: "inter_semibold" }} variant="body1">
            Scope of Work{" "}
            <Typography component="span" variant="h6" color="error">
              *
            </Typography>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="caption" sx={{ mx: 2 }}>
              Upload file or paste link below
            </Typography>
            <input
              style={{ display: "none" }}
              id="sow-input-field"
              type="file"
              onChange={handleSOWFileSelection}
            />
            {isSOWSaving ? (
              <IconButton disabled>
                <CircularProgress size={18} color="inherit" />
              </IconButton>
            ) : (
              <IconButton component="label" htmlFor="sow-input-field">
                <CloudUploadOutlinedIcon />
              </IconButton>
            )}
          </Box>
        </Box>
        {isSOWSaving ? (
          <>
            <Skeleton height={60} />
            <Box />
          </>
        ) : (
          <>
            <TextField
              name="sow"
              helperText={errors.sow}
              error={!!(errors.sow || "").trim()}
              fullWidth
              size="small"
              placeholder="Enter Scope of Work"
              variant="outlined"
              value={sow}
              onChange={handleFieldChange}
            />{" "}
            {(selectedSOWFile && !isSOWSaving) && (
              <Typography variant="subtitle2" noWrap>
                {selectedSOWFile.name}
              </Typography>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default AdvanceDetails;
