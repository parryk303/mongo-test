import { http } from "@client/shared/services";
import { responseFormatter } from "@client/utils";

const get = (query = "", id = "") => {
  return responseFormatter(
    http.get(`/projects${query == null ? id : query}`, {
      withCredentials: true,
    })
  );
};

const post = (payload = {}) => {
  return responseFormatter(
    http.post(`/project`, payload, {
      withCredentials: true,
    })
  );
};

const getProjectDetails = (id = "") => {
  return responseFormatter(
    http.get(`/project/${id}/project-details`, {
      withCredentials: true,
    })
  );
};

const getConnectivityTypeList = () => {
  return responseFormatter(
    http.get("/connectivity-types", {
      withCredentials: true,
    })
  );
};

const uploadSOWFile = (payload = {}) => {
  return responseFormatter(
    http.post(`/upload/sow`, payload, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );
};

const uploadMessageCertificate = (payload = {}) => {
  return responseFormatter(
    http.post(`/message-certificate`, payload, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );
};

const deleteMessageCertificate = (id = "") => {
  return responseFormatter(
    http.delete(`/message-certificate/${id}`, {
      withCredentials: true,
    })
  );
};

const getSow = (id = "") => {
  return responseFormatter(
    http.get(`/project/${id}/sow`, {
      withCredentials: true,
    })
  );
};

const getCertificate = (id = "") => {
  return responseFormatter(
    http.get(`/message-certificate/${id}`, {
      withCredentials: true,
    })
  );
};

const getConnectivityDetails = (id = "") => {
  return responseFormatter(
    http.get(`/project/${id}/connectivity-details`, {
      withCredentials: true,
    })
  );
};

const Service = {
  get,
  post,
  getProjectDetails,
  getConnectivityTypeList,
  uploadMessageCertificate,
  uploadSOWFile,
  deleteMessageCertificate,
  getSow,
  getConnectivityDetails,
  getCertificate
};

export default Service;
