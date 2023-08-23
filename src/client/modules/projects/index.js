import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  PROJECT_STATUS,
  PROJECT_STATUS_CONFIG,
} from "@client/shared/constants";
import { AppContext } from "@client/shared/contexts";
import { queryStringBuilder } from "@client/utils";
import Service from "./service";
import ProjectsView from "./view";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const DEFAULT_PAGE_SIZE = 10;
const defaultState = {
  entries: [],
  totalEntries: 0,
  pageSize: DEFAULT_PAGE_SIZE,
  filters: [],
  searchFilter: [],
  order: null,
  orderBy: null,
  isSearching: false,
};

const Projects = () => {
  const { appData } = useContext(AppContext);
  const isCustomer = appData?.userData?.isCustomer; 
  const navigate = useNavigate();
  const [state, setState] = useState(defaultState);

  const fetchEntries = useCallback(
    async (
      pageSize = DEFAULT_PAGE_SIZE,
      filters = [],
      searchFilter = [],
      order = null,
      orderBy = ""
    ) => {
      const sortingOrder =
        order === "DESC" ? "-1" : order === "ASC" ? "1" : order;
      const queryString = queryStringBuilder(
        pageSize,
        0,
        searchFilter,
        filters,
        { field: orderBy, order: sortingOrder }
      );

      const { data, error } = await Service.get(queryString);
      if (error) {
        toast.error(Array.isArray(error) ? error[0]?.message : error);
      } else {
        setState((prevState) => ({
          ...prevState,
          entries: data?.projects || defaultState.entries,
          totalEntries: data?.count || defaultState.totalEntries,
        }));
      }
      setState((prevState) => ({
        ...prevState,
        isSearching: false,
      }));
    },
    []
  );

  const handleLoadMore = () => {
    setState((prevState) => ({
      ...prevState,
      pageSize: prevState.pageSize + DEFAULT_PAGE_SIZE,
    }));
  };

  const handleSearch = (keyword = "") => {
    const searchFields = ["customerName", "projectName", "projectStatus", "rcAccountId"];
    let searchFilter = keyword
      ? searchFields.map((element) => {
          return { field: element, value: keyword };
        })
      : [];

    setState((prevState) => ({
      ...prevState,
      searchFilter,
      isSearching: true,
    }));
  };

  const handleRowClick = (projectId) => {
    navigate(`/projects/${projectId}/info`);
  };

  const handleSorting = useCallback((fieldObj, order) => {
    setState((prevState) => ({
      ...prevState,
      order,
      orderBy: order ? fieldObj.field || fieldObj.fieldName : null,
    }));
  }, []);

  const renderStatusChip = (data) => {
    const projectStatus = Object.keys(PROJECT_STATUS).find((key) => {
      const status = (data?.projectStatus || "").toLowerCase();
      return PROJECT_STATUS[key] === status;
    });
    const projectConfig = PROJECT_STATUS_CONFIG[projectStatus] || {};
    return (
      <Tooltip title={data.projectStatus} placement="top-start">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => handleRowClick(data._id)}
        >
          <FiberManualRecordIcon
            sx={{ fontSize: 16, mr: 2, color: projectConfig.color || "" }}
          />
          <Typography
            sx={{ fontFamily: "inter_semibold", color: "grey" }}
            variant="caption"
          >
            {projectConfig.label}
          </Typography>
        </Box>
      </Tooltip>
    );
  };

  let columnConfig = [
    {
      id: "customerName",
      label: "Customer",
      canSort: true,
      field: "customerName",
      render: (row) => {
        const accountId = row.rcAccountId ? `(${row.rcAccountId})` : "";
        return (
          <Tooltip
            title={row.customerName + "  " + accountId}
            placement="top-start"
          >
            <Typography
              variant="body2"
              onClick={() => handleRowClick(row._id)}
              sx={{ fontFamily: "inter_semibold", cursor: "pointer" }}
            >
              {row.customerName + "  " + accountId}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      id: "projectName",
      label: "Project Name",
      canSort: true,
      field: "projectName",
      render: (row) => (
        <Tooltip title={row.projectName} placement="top-start">
          <Typography
            variant="body2"
            onClick={() => handleRowClick(row._id)}
            sx={{ fontFamily: "inter_semibold", cursor: "pointer" }}
          >
            {row.projectName}
          </Typography>
        </Tooltip>
      ),
    },
    {
      id: "projectManager",
      label: "Project Manager",
      canSort: true,
      field: "projectManager",
      render: (row) => (
        <Tooltip title={row.projectManager} placement="top-start">
          <Typography
            variant="body2"
            onClick={() => handleRowClick(row._id)}
            sx={{ fontFamily: "inter_semibold", cursor: "pointer" }}
          >
            {row.projectManager || "-"}
          </Typography>
        </Tooltip>
      ),
    },
    {
      id: "projectStatus",
      label: "Status",
      canSort: true,
      field: "projectStatus",
      render: renderStatusChip,
    },
  ];

  if (isCustomer) {
    columnConfig = columnConfig.filter(config => config.id !== 'customerName');
  }

  useEffect(() => {
    fetchEntries(
      state.pageSize,
      state.filters,
      state.searchFilter,
      state.order,
      state.orderBy
    );
  }, [
    state.pageSize,
    state.filters,
    state.order,
    state.orderBy,
    state.searchFilter,
  ]);

  return (
    <ProjectsView
      columnConfig={columnConfig}
      entries={state.entries}
      totalEntries={state.totalEntries}
      order={state.order}
      orderBy={state.orderBy}
      isSearching={state.isSearching}
      isCustomer={isCustomer}
      handleLoadMore={handleLoadMore}
      handleSearch={handleSearch}
      handleSorting={handleSorting}
    />
  );
};

export default Projects;
