import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectInfoView from "./view";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CellTowerOutlinedIcon from "@mui/icons-material/CellTowerOutlined";
import GradingIcon from "@mui/icons-material/Grading";
import { noop, globalStyles } from "@client/shared/constants";
import Service from "../service";
import { toast } from "react-toastify";

const defaultState = {
  isLoading: false,
  entries: {},
};

const ProjectInfo = () => {
  const [state, setState] = useState(defaultState);

  const navigate = useNavigate();

  const { id } = useParams();

  const fetchProjectInfo = useCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    const { data, error } = await Service.getProjectDetails(id);

    if (error) {
      return toast.error(Array.isArray(error) ? error[0]?.message : error);
    }
    setState((prevState) => ({
      ...prevState,
      isLoading: false,
      entries: data.projects[0] || {},
    }));
  }, []);

  //TODO
  const projectInfo = {
    projectInfoData: [
      {
        heading: "Project Status",
        description: "Current development status of this projects.",
        status: state.entries.projectStatus || "",
        icon: <ContentPasteSearchIcon fontSize="large" />,
      },
      {
        heading: "Health Status",
        description: "Health of deployed Cloud Relay. (Grafana Dashboard)",
        icon: <LeaderboardOutlinedIcon fontSize="large" />,
        to: "/health-status",
      },
      {
        heading: "Postman Collection",
        description: "Collection of saved requests for this projects.",
        status: "Download",
        icon: (
          <img
            style={{ width: "32px" }}
            src="/assets/postman_icon.png"
            alt=""
          />
        ),
      },
      {
        heading: "Contact Info",
        description:
          "List of contacts for involved in this Cloud Relay projects.",
        icon: <PortraitOutlinedIcon fontSize="large" />,
        to: "/contact-info",
      },
    ],
    projectsData: [
      {
        heading: "Project Details",
        description: "Submitted project details for this projects.",
        icon: <img style={{ width: "32px" }} src="/assets/write.png" alt="" />,
        to: `/projects/${id}/details`,
      },
      {
        heading: "Project Requests",
        description:
          "List of current and past update requests for this projects.",
        icon: <GradingIcon fontSize="large" />,
        to: "/project-request",
      },
      {
        heading: "SOW",
        description: "Scope of work document for this projects.",
        icon: <AssignmentOutlinedIcon fontSize="large" />,
      },
      {
        heading: "Connectivity Details",
        description: "JSON to SOAP, VPN, No Message Certificates.",
        icon: <CellTowerOutlinedIcon fontSize="large" />,
        to: `/projects/${id}/connectivity-details`,
      },
    ],
  };

  // if (state.entries.projectStatus) {
  //   const obj = projectInfo.projectInfoData[0];
  //   obj["status"] = state.entries.projectStatus;
  // }

  const handleNavigate = (path) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    navigate(path);
    setState((prevState) => ({
      ...prevState,
      isLoading: false,
    }));
  };

  const downloadSow = async(id) => {
    const {error, data } = await Service.getSow(id);
    if (error) {
      return toast.error(Array.isArray(error) ? error[0]?.message : error);
    } else {
      let sowUrl = data?.sow || "";
      if (!sowUrl.match(/^https?:\/\//i)) {
        sowUrl = 'http://' + sowUrl;
      }
      const isFile = /\.(pdf|jpe?g|png|gif|docx?|xlsx?|txt)$/i.test(sowUrl);
      if (isFile) {
        const link = document.createElement("a");
        link.href = sowUrl;
        link.target = "_blank";
        link.download = true;
        link.click();
      } else {
        window.open(sowUrl, "_blank", "noreferrer");
      }
    }
  }

  const handleDownload = (type = "") => {
    if (type === "sow") {
      downloadSow(state.entries._id);
      
    } else if (type === "postman") {
      console.log("test");
    }
  };

  useEffect(() => {
    fetchProjectInfo();
  }, []);

  return (
    <>
      <ProjectInfoView
        projectInfo={projectInfo}
        handleNavigate={handleNavigate}
        handleDownload={handleDownload}
        entries={state.entries}
      />
    </>
  );
};

export default ProjectInfo;
