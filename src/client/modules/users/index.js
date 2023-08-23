import { useState, useCallback, useEffect, useContext } from "react";
import { toast } from "react-toastify";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import AddUser from "./add";
import UsersView from "./view";
import Services from "./service";

import { validate as validator, queryStringBuilder } from "@client/utils";
import { VALIDATIONS } from "@client/shared/constants";
import DeleteUser from "./delete";
import MenuItem from "@mui/material/MenuItem";

import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { AppContext } from "src/client/shared/contexts";

const DEFAULT_PAGE_SIZE = 10;

const defaultState = {
  entries: [],
  roles: [],
  jobTitles: [],
  filters: [],
  searchFilter: [],
  order: null,
  orderBy: null,
  totalEntries: 0,
  pageSize: DEFAULT_PAGE_SIZE,
  isDialogOpen: false,
  isDeleting: false,
  isEditing: false,
  // isAdmin: true,
  roleId: "",
  details: {
    roleId: "",
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    jobTitleId: "",
  },
  errors: {},
  isSearching: false,
  isButtonLoading: false,
  rowId: "",
  user: {},
};

const Users = () => {
  const [state, setState] = useState(defaultState);
  const { appData } = useContext(AppContext);
  const isAdmin = appData?.userData?.isAdmin;

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
        {
          field: orderBy,
          order: sortingOrder,
        }
      );

      const { data, error } = await Services.getUsers(queryString);
      if (error) {
        toast.error(Array.isArray(error) ? error[0]?.message : error);
      } else {
        setState((prevState) => ({
          ...prevState,
          entries: data?.users || defaultState.entries,
          totalEntries: data?.count || defaultState.totalEntries,
        }));
      }
      setState((prevState) => ({
        ...prevState,
        isSearching: false,
      }));
    },
    [
      state.pageSize,
      state.filters,
      state.searchFilter,
      state.order,
      state.orderBy,
    ]
  );

  const fetchRoles = useCallback(async () => {
    const { data, error } = await Services.getRoles();
    if (error) {
      toast.error(Array.isArray(error) ? error[0]?.message : error);
    } else {
      setState((prevState) => ({
        ...prevState,
        roles: data?.roles || defaultState.roles,
      }));
    }
  }, []);

  const fetchJobTitles = useCallback(async () => {
    const { data, error } = await Services.getJobTitles();
    if (error) {
      toast.error(Array.isArray(error) ? error[0]?.message : error);
    } else {
      setState((prevState) => ({
        ...prevState,
        jobTitles: data?.jobTitles || defaultState.jobTitles,
      }));
    }
  }, []);

  const validateFields = (field, value) => {
    let errorMessage = "";
    const fieldValidatorMap = {
      roleId: [{ type: VALIDATIONS.REQUIRED, value: true }],

      firstName: [
        { type: VALIDATIONS.REQUIRED, value: true },
        { type: VALIDATIONS.MAX_LENGTH, value: 100 },
      ],
      lastName: [
        { type: VALIDATIONS.REQUIRED, value: true },
        { type: VALIDATIONS.MAX_LENGTH, value: 100 },
      ],
      companyName: [
        { type: VALIDATIONS.REQUIRED, value: true },
        { type: VALIDATIONS.MAX_LENGTH, value: 100 },
      ],
      email: [
        { type: VALIDATIONS.REQUIRED, value: true },
        { type: VALIDATIONS.EMAILS, value: "" },
        { type: VALIDATIONS.MAX_LENGTH, value: 100 },
      ],
      jobTitleId: [{ type: VALIDATIONS.REQUIRED, value: true }],
    };

    if (fieldValidatorMap[field]) {
      const validationResult = fieldValidatorMap[field].map((validation) =>
        validator(
          value,
          validation.type,
          validation.value,
          validation.inputType || "string",
          validation.message
        )
      );
      errorMessage = validationResult
        .filter((error) => !error?.isValid)
        .map((error) => error?.errorMessage)[0];
    } else {
      Object.keys(fieldValidatorMap).forEach((key) => {
        const message = validateFields(key, state.details[key]);
        if (!!message) {
          errorMessage = message;
        }
      });
    }

    return errorMessage;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const errorMessage = validateFields(name, value) || " ";

    setState((prevState) => ({
      ...prevState,
      [name]: value,
      details: {
        ...prevState.details,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: errorMessage,
      },
    }));
  };

  const handleAddUser = useCallback(async (details = {}) => {
    setState((prevState) => ({
      ...prevState,
      isButtonLoading: true,
    }));
    const payload = {
      roleId: details.roleId,
      firstName: details.firstName.trim(),
      lastName: details.lastName.trim(),
      email: details.email.trim(),
      companyName: details.companyName.trim(),
      jobTitleId: details.jobTitleId,
    };
    const { data, error } = await Services.createUser(payload);

    if (error) {
      setState((prevState) => ({
        ...prevState,
        isButtonLoading: false,
      }));
      return toast.error(
        Array.isArray(error)
          ? error[0]?.response?.message || error[0]?.response?.error
          : error
      );
    }
    setState((prevState) => ({
      ...prevState,
      isButtonLoading: false,
    }));

    toast.success("User created successfully.");
    handleDialogOpen(false);
    fetchEntries(
      state.pageSize,
      state.filters,
      state.searchFilter,
      state.order,
      state.orderBy
    );
  }, []);

  const handleDialogOpen = useCallback((value) => {
    setState((prevState) => ({
      ...prevState,
      isDialogOpen: value,
      details: defaultState.details,
      errors: defaultState.errors,
    }));
    fetchJobTitles();
  }, []);

  const handleDeleteDialog = (value) => {
    setState((prevState) => ({
      ...prevState,
      isDeleting: value,
    }));
  };

  const handleUpdateRole = useCallback(async (userId = "", roleId = "") => {
    const { error } = await Services.updateUserRole(userId, roleId);
    if (error) {
      return toast.error(Array.isArray(error) ? error[0]?.message : error);
    }
    toast.success("Role updated successfully.");
    fetchEntries(
      state.pageSize,
      state.filters,
      state.searchFilter,
      state.order,
      state.orderBy
    );
  }, []);

  const handleDeleteUser = useCallback(async (userId) => {
    const { data, error } = await Services.deleteUser(userId);
    if (error) {
      toast.error(Array.isArray(error) ? error[0]?.message : error);
    }
    toast.success("User deleted successfully.");
    handleDeleteDialog(false);
    fetchEntries(
      state.pageSize,
      state.filters,
      state.searchFilter,
      state.order,
      state.orderBy
    );
  }, []);

  const handleSearch = (keyword = "") => {
    const fullName = keyword.split(" ");
    const searchFields = [
      "firstName",
      "lastName",
      "roleName",
      "jobTitleName",
      "jobTitleAlias",
      "email",
    ];
    let searchFilter = keyword
      ? searchFields.map((element) => {
          if (
            fullName.length > 1 &&
            (element === "firstName" || element === "lastName")
          ) {
            return {
              field: element,
              value:
                element === "firstName"
                  ? fullName[0]
                  : fullName.filter((_, index) => index !== 0).join(" "),
            };
          }
          return { field: element, value: keyword };
        })
      : [];

    setState((prevState) => ({
      ...prevState,
      searchFilter,
      isSearching: true,
    }));
  };

  const handleSorting = useCallback((fieldObj, order) => {
    setState((prevState) => ({
      ...prevState,
      order,
      orderBy: order ? fieldObj.field || fieldObj.fieldName : null,
    }));
  }, []);

  const handleLoadMore = () => {
    setState((prevState) => ({
      ...prevState,
      pageSize: prevState.pageSize + DEFAULT_PAGE_SIZE,
    }));
  };

  const columnConfig = [
    {
      id: "roleName",
      label: "Role",
      canSort: true,
      field: "roleName",
      render: (row) => (
        <>
          {isAdmin && (row?.role?.name || "").toLowerCase() === "internal" ? (
            <>
              <TextField
                select
                size="small"
                autoFocus
                value={row?.role?.name}
                variant="outlined"
                sx={{
                  fontFamily: "inter_medium",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiSelect-select": {
                    paddingLeft: 0,
                  },
                }}
                onChange={(e) => {
                  const roleId = state.roles.find(
                    (role) => role.name === e.target.value
                  )?._id;
                  roleId && handleUpdateRole(row._id, roleId);
                }}
              >
                {state.roles.slice(0, 2).map((option) => (
                  <MenuItem
                    disabled={option?.name === row?.role?.name}
                    key={option?.name}
                    value={option?.name}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </>
          ) : (
            <Tooltip placement="top-start" title={row?.role?.name}>
              <Typography variant="body2" sx={{ fontFamily: "inter_medium" }}>
                {row?.role?.name}
              </Typography>
            </Tooltip>
          )}
        </>
      ),
    },
    {
      id: "firstName",
      label: "User",
      canSort: true,
      field: "firstName",
      render: (row) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            alt={`${row?.firstName} ${row?.lastName}`}
            sx={{ width: 40, height: 40 }}
            src={row.avatar || " "}
          />
          <Tooltip
            title={`${row?.firstName} ${row?.lastName}`}
            placement="top-start"
          >
            <Typography
              variant="body2"
              sx={{ fontFamily: "inter_medium" }}
            >{`${row?.firstName} ${row?.lastName}`}</Typography>
          </Tooltip>
        </Box>
      ),
    },
    {
      id: "jobTitleName",
      label: "Job Title",
      canSort: true,
      field: "jobTitleName",
      render: (row) => (
        <Tooltip title={row?.jobTitle?.name} placement="top-start">
          <Typography variant="body2" sx={{ fontFamily: "inter_medium" }}>
            {row?.jobTitle?.alias}
          </Typography>
        </Tooltip>
      ),
    },
    {
      id: "email",
      label: "Email",
      canSort: true,
      field: "email",
      render: (row) => (
        <Tooltip title={row?.email} placement="top-start">
          <Typography variant="body2" sx={{ fontFamily: "inter_medium" }}>
            {row?.email}
          </Typography>
        </Tooltip>
      ),
    },
    {
      id: "col-action",
      label: "Action",
      isHidden: !isAdmin,

      render: (row) => {
        return (
          <>
            <Tooltip
              title={`Delete ${row?.jobTitle?.alias} - ${row?.firstName} ${row?.lastName}?`}
              placement="right"
              arrow
            >
              <IconButton
                size="small"
                color="primary"
                // disabled={!isAdmin}
                onClick={() => {
                  handleDeleteDialog(true);
                  setState((pre) => ({
                    ...pre,
                    rowId: row._id,
                  }));
                }}
              >
                <HighlightOffOutlinedIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

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
    state.searchFilter,
    state.order,
    state.orderBy,
  ]);

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <>
      <UsersView
        isDialogOpen={state.isDialogOpen}
        handleDialogOpen={handleDialogOpen}
        columnConfig={columnConfig}
        entries={state.entries}
        totalEntries={state.totalEntries}
        handleSearch={handleSearch}
        isSearching={state.isSearching}
        order={state.order}
        orderBy={state.orderBy}
        handleSorting={handleSorting}
        handleLoadMore={handleLoadMore}
        isAdmin={isAdmin}
      />
      {state.isDialogOpen && (
        <AddUser
          isDialogOpen={state.isDialogOpen}
          handleDialogOpen={handleDialogOpen}
          handleUserDetails={handleAddUser}
          details={state.details}
          handleChange={handleChange}
          roles={state.roles}
          jobTitles={state.jobTitles}
          isValidated={!!validateFields()}
          errors={state.errors}
          isButtonLoading={state.isButtonLoading}
        />
      )}

      {state.isDeleting && (
        <DeleteUser
          isDeleting={state.isDeleting}
          isEditing={state.isEditing}
          handle
          rowId={state.rowId}
          handleDeleteDialog={handleDeleteDialog}
          handleDeleteUser={handleDeleteUser}
        />
      )}
    </>
  );
};

export default Users;
