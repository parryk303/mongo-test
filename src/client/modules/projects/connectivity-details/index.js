import { useCallback, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import ConnectivityDetailsView from "./view";
import Service from "../service";
import { useParams } from "react-router-dom";
import { AppContext } from "src/client/shared/contexts";

const defaultState = {
  isEditing: false,
  entries: [],
  messageCertificates: [],
};

const ConnectivityDetails = () => {
  const params = useParams();
  const [state, setState] = useState(defaultState);
  const { appData } = useContext(AppContext);
  const isAdmin = appData?.userData?.isAdmin;

  const fetchEntries = useCallback(async () => {
    const { data, error } = await Service.getConnectivityDetails(params.id);

    if (error) {
      toast.error(Array.isArray(error) ? error[0]?.message : error);
    } else {
      setState((prevState) => ({
        ...prevState,
        entries:
          data?.projects[0]?.connectivityDetails.find(
            (detail) => detail.projectId === params.id
          ) || defaultState.entries,
        messageCertificates: data?.projects?.[0]?.messageCertificates || defaultState.messageCertificates
      }));
    }
  }, []);

  const handleEditChange = (value) => {
    setState((pre) => ({
      ...pre,
      isEditing: value,
    }));
  };

  const  handleCertificateDownload = async id => {
    const {error, data } = await Service.getCertificate(id);
    if (error) {
      return toast.error(Array.isArray(error) ? error[0]?.message : error);
    } else {
      let certificateUrl = data?.msgCertificate?.certificate?.signedUrl || "";
      if (!certificateUrl.match(/^https?:\/\//i)) {
        certificateUrl = 'http://' + certificateUrl;
      }
      const isFile = /\.(pdf|jpe?g|png|gif|docx?|xlsx?|txt)$/i.test(certificateUrl);
      if (isFile) {
        const link = document.createElement("a");
        link.href = certificateUrl;
        link.target = "_blank";
        link.download = true;
        link.click();
      } else {
        window.open(certificateUrl, "_blank", "noreferrer");
      }
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <ConnectivityDetailsView
      isEditing={state.isEditing}
      handleEditChange={handleEditChange}
      data={state.entries}
      messageCertificates={state.messageCertificates}
      isAdmin={isAdmin}
      handleCertificateDownload={handleCertificateDownload}
    />
  );
};

export default ConnectivityDetails;
