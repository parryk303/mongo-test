import { useCallback, useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DefaultLayout } from "@client/shared/components";
import { AppService } from "@client/shared/services";
import Box from "@mui/material/Box";
import Projects from "./projects";
import ProjectForm from "./projects/form";
import { AppContext } from "@client/shared/contexts";
import ProjectDetails from "./projects/project-details";
import ProjectInfo from "./projects/project-info";
import ConnectivityDetails from "./projects/connectivity-details";
import Users from "./users";

const App = () => {
  const { setAppData, appData } = useContext(AppContext);
  const fetchUserData = useCallback(async () => {
    const { data, error } = await AppService.getUserDetails();
    return error ? {} : data?.user || {};
  }, []);

  const fetchVersion = useCallback(async () => {
    const { data, error } = await AppService.getVersion();
    return error ? {} : data || {};
  }, []);

  const initializeApp = useCallback(async () => {
    const userData = await fetchUserData();
    const version = await fetchVersion();
    setAppData("userData", {
      ...userData,
      isAdmin: (userData?.role?.[0]?.name || "").toLowerCase() === 'admin', 
      isCustomer: (userData?.role?.[0]?.name || "").toLowerCase() === 'customer'
    });
    setAppData("version", version);
    // TODO: Fix page config methods and set theme and layout
    // setPageConfig(PAGE_KEYS.GLOBAL, {
    //   theme: data.user?.theme || THEME_VARIANT.LIGHT,
    //   layout: data.user?.layout,
    // });
  }, [fetchUserData, fetchVersion]);

  const subHeaderList = [
    { label: "Documentation", to: "/", isDisabled: true },
    { label: "Cloud Relay Projects", to: "/projects" },
  ];

  if (!appData?.userData?.isCustomer) {
    subHeaderList.push({ label: "Start New Project", to: "/projects/new" });
  }

  if (appData?.userData?.isAdmin) {
    subHeaderList.push({ label: "Users", to: "/users" });
  }

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return (
    <Box>
      <DefaultLayout
        userData={appData.userData || {}}
        version={appData.version || {}}
        subHeaderList={subHeaderList || []}
      ></DefaultLayout>
      <Box sx={{ mt: "40px" }}>
        <Routes>
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new" element={<ProjectForm />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new" element={<ProjectForm />} />
          <Route path="projects/:id/details" element={<ProjectDetails />} />
          <Route path="/projects/:id/info" element={<ProjectInfo />} />
          <Route
            path="/projects/:id/connectivity-details"
            element={<ConnectivityDetails />}
          />
          {appData?.userData?.isAdmin && <Route path="/users" element={<Users />} />}
          <Route path="/" element={<Navigate to="/projects" />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
