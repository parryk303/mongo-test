import http from "./api-communicator";
import { responseFormatter } from "@client/utils";
export { default as http } from "./api-communicator";

const logoutUser = () => {
  return responseFormatter(
    http.post(`logout`, null, {
      withCredentials: true,
    })
  );
};

const getUserDetails = () => {
  return responseFormatter(
    http.get("/user/me", {
      withCredentials: true
    })
  );
};

const patchUserPreference = (preference = "") => {
  return responseFormatter(
    http.patch(
      "/setuserpreferences",
      { delete_confirmation: preference },
      { withCredentials: true }
    )
  );
};

const getVersion = async () => {
  return responseFormatter(http.get("/version"));
};

const updateUserData = (userId, data) => {
  return responseFormatter(
    http.patch(`/user/${userId}`, data, {
      withCredentials: true
    })
  );
};

export const AppService = {
  getVersion,
  getUserDetails,
  logoutUser,
  updateUserData,
  patchUserPreference
};
