import { useCallback, useEffect, useState } from "react";
import ProjectDetailsView from "./view";
import Service from "../service";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
const defaultState = {
  isEdit: false,
  isLoading: false,
  entries: [],
};
const ProjectDetails = () => {
  const [state, setState] = useState(defaultState);
  const { id } = useParams();
  const fetchProjectDetails = useCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    const { data, error } = await Service.getProjectDetails(id || "");
    if (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
      return toast.error(Array.isArray(error) ? error[0]?.message : error);
    }

    setState((prevState) => ({
      ...prevState,
      isLoading: false,
      entries: data.projects || defaultState.entries,
    }));
  }, []);

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  // const handleEditProjectDetails = () => {
  // setState((prevState) => ({
  //   ...prevState,
  //   isEdit: true,
  // }));
  // };
  console.log(`state.entries`, state.entries);
  return (
    <>
      <ProjectDetailsView
        entries={state.entries}
        // handleEditProjectDetails={handleEditProjectDetails}
        // isEdit={state.isEdit}
      />
    </>
  );
};

export default ProjectDetails;
