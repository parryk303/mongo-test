import { http } from "@client/shared/services";
import { responseFormatter } from "@client/utils";

const getUsers = (query = "") => {
  return responseFormatter(
    http.get(`/users${query}`, {
      withCredentials: true,
    })
  );
};
const getRoles = () => {
  return responseFormatter(
    http.get(`/roles`, {
      withCredentials: true,
    })
  );
};
const getJobTitles = () => {
  return responseFormatter(
    http.get(`/job-titles`, {
      withCredentials: true,
    })
  );
};
const createUser = (payload) => {
  return responseFormatter(
    http.post(`/users`, payload, {
      withCredentials: true,
    })
  );
};
const updateUserRole = (userId, roleId) => {
  return responseFormatter(
    http.patch(`/user/${userId}/role/${roleId}`, {}, {
      withCredentials: true,
    })
  );
};
const deleteUser = (id = "") => {
  return responseFormatter(
    http.delete(`/user/${id}`, {
      withCredentials: true,
    })
  );
};

const Services = {
  getUsers,
  getRoles,
  getJobTitles,
  createUser,
  updateUserRole,
  deleteUser,
};

export default Services;
