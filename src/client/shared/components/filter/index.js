import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Select from "@mui/material/Select";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";

import filterStyles from "./styles";
import Tooltip from "@mui/material/Tooltip";

const noop = () => {};

const defaultRow = {
  keyId: Date.now(),
  label: "",
  type: "",
  value: "",
  isFilterApplied: false,
};

const STRING_TYPE_LIST = {
  Contains: "iRegexp",
  "Does not contain": "notIRegexp",
  Equals: "iLike",
  "Does not equal": "notILike",
};

const ARRAY_TYPE_LIST = {
  Equals: "iLike",
  "Does Not Equal": "notILike",
  // In: 'in',
  // 'Not In': 'notIn',
};
const NUM_TYPE_LIST = {
  Equals: "eq",
  // "Does not equal": "notILike"
  // In: 'in',
  // 'Not In': 'notIn',
};
const RANGE_TYPE_LIST = {
  "Greater than": "gt",
  "Less than": "lt",
  "Greater than equal to": "gte",
  "Less than equal to": "lte",
};
const OPERATOR_TYPE_LIST = {
  string: STRING_TYPE_LIST,
  number: NUM_TYPE_LIST,
  array: ARRAY_TYPE_LIST,
  range: RANGE_TYPE_LIST,
};
const defaultState = {
  filterRows: [defaultRow],
  columnsList: [],
  currentRow: null,
  isFiltering: false,
};

const Filter = ({
  isFiltering = false,
  filterConfig = [],
  onFilterApply = noop,
  appliedFilters = [],
  disabled = false,
  onReady = noop,
  onFilterClose = noop,
  onClose = noop,
}) => {
  const [state, setState] = useState(defaultState);
  const handleChange = (rowIndex, type = "", value = "") => {
    const row = { ...state.filterRows[rowIndex] };
    row[type] = value;
    if (type === "label") {
      row.type = "";
      row.value = "";
    }
    if (type === "type") {
      row.value = "";
    }

    setState((prevState) => {
      const filterRows = prevState.filterRows.slice();
      filterRows.splice(rowIndex, 1, row);
      return {
        ...prevState,
        filterRows,
      };
    });
  };
  const handleDeleteRow = (rowIndex) => {
    setState((prevState) => {
      const { filterRows } = prevState;
      filterRows.splice(rowIndex, 1);
      const updatedRows = prevState.filterRows;
      return {
        ...prevState,
        filterRows: updatedRows,
      };
    });
  };

  const handleCancel = () => {
    onClose();
    setState((prevState) => {
      let updatedRows = prevState.filterRows?.filter(
        (row) => row.isFilterApplied
      );
      updatedRows = updatedRows.length ? updatedRows : defaultState.filterRows;
      return {
        ...prevState,
        isFiltering: false,
        //filterRows: updatedRows,
      };
    });
  };

  const handleAddClick = () => {
    const { filterRows } = state;
    filterRows.push({
      ...defaultRow,
      keyId: Date.now(),
    });
    setState((prevState) => {
      const updatedRows = prevState.filterRows;
      return {
        ...prevState,
        filterRows: updatedRows,
      };
    });
  };

  const validateRows = () => {
    const { filterRows } = state;
    const isRowEmpty = filterRows.find((row) => {
      return !row.label || !row.type || !row.value?.toString().trim();
    });
    return !!isRowEmpty;
  };
  const handleApplyFilter = (filters = []) => {
    // if (!filters.length) {
    //   return onFilterApply([], []);
    // }
    const filterArr = [];
    filters.map((item) => {
      const columnField = state.columnsList.find(
        (row) => row.columnName === item.label
      );
      // const columns =
      //   columnField?.columnType === "string"
      //     ? STRING_TYPE_LIST
      //     : columnField?.columnType === "array"
      //     ? ARRAY_TYPE_LIST
      //       : NUM_TYPE_LIST;
      const columns = OPERATOR_TYPE_LIST[columnField?.columnType];
      const option = columnField?.options?.find(
        (opt) => opt.label === item.value
      );
      const value = option
        ? option.value
        : columnField.isDateField
        ? format(new Date(item.value), "yyyy-MM-dd")
        : item.value;

      const type =
        columnField.isDateField &&
        !columnField.hasTimeStamp &&
        columns[item.type] === "iLike"
          ? "="
          : columnField.isDateField &&
            !columnField.hasTimeStamp &&
            columns[item.type] === "notILike"
          ? "neq"
          : columnField.hasTimeStamp && columns[item.type] === "iLike"
          ? "iRegexp"
          : columnField.hasTimeStamp && columns[item.type] === "notILike"
          ? "notIRegexp"
          : columns[item.type];
      filterArr.push({
        field: columnField.columnValue,
        type,
        value: (value || "").trim(),
      });
    });
    onFilterApply(filterArr);
  };

  // React.useEffect(() => {
  //   if (appliedFilters.length) {
  //     const ref = document.getElementById('active-state');
  //     setAnchorRef(ref);
  //     setState(prevState => ({
  //       ...prevState,
  //       isFiltering: true,
  //     }));
  //   }
  // }, [appliedFilters]);

  useEffect(() => {
    const updatedFilterConfig = filterConfig.map((item) => {
      return {
        columnName: item.fieldToDisplay,
        columnType: item.operatorType,
        columnValue: item.field,
        subField: item.subField,
        options: item.options,
        isDateField: item.isDateField,
        hasTimeStamp: item.hasTimeStamp,
      };
    });
    setState((prevState) => ({
      ...prevState,
      columnsList: updatedFilterConfig,
    }));
    if (appliedFilters.length) {
      const updatedRows = appliedFilters.map((item) => {
        const columnField = updatedFilterConfig.find(
          (row) => row.columnValue === item.field
        );
        const columns = OPERATOR_TYPE_LIST[columnField?.columnType];
        let type = "";
        if (
          (columnField?.isDateField && item.type === "=") ||
          (columnField?.hasTimeStamp && item.type === "iRegexp")
        )
          type = "Equals";
        else if (
          (columnField?.isDateField && item.type === "neq") ||
          (columnField?.hasTimeStamp && item.type === "notIRegexp")
        )
          type = "Does not equal";
        else
          type = Object.keys(columns).find((key) => columns[key] === item.type);

        const label = columnField?.columnName;

        const value = columnField?.options?.length
          ? columnField.options.find((option) => option?.value === item?.value)
              ?.label
          : columnField?.isDateField
          ? new Date(item.value)
          : item.value;
        return {
          keyId: Date.now(),
          label,
          type,
          value,
          isFilterApplied: true,
        };
      });
      setState((prevState) => ({
        ...prevState,
        filterRows: updatedRows,
      }));
    }
  }, [isFiltering]);

  const isDisabled = validateRows() || disabled;
  onReady({
    close: () => {
      onFilterClose();
      // setState(prevState => ({
      //   ...defaultState,
      //   filterRows: [defaultRow],
      // }));
      // handleApplyFilter([]);
    },
    clearFilter: () => {
      setState(prevState => ({
        ...prevState,
        filterRows: [defaultRow]
      }))
      handleApplyFilter([])
    }
  });
  return (
    <ClickAwayListener onClickAway={onFilterClose} mouseEvent="onMouseDown">
      <>
        <Tooltip title="Filter Data Table" placement="top">
          <IconButton
            onClick={() => {
              setState((prevState) => ({
                ...prevState,
                isFiltering: true,
              }));
            }}
            disabled={disabled}
          >
            {appliedFilters.length ? (
              <FilterAltIcon sx={{ color: "#00A8FF" }} fontSize="small" />
            ) : (
              <img
                src={
                  disabled
                    ? "/assets/filter-disabled.svg"
                    : "/assets/filter.svg"
                }
                alt="Filter"
              />
            )}
          </IconButton>
        </Tooltip>
        <Drawer open={state.isFiltering} anchor="right" onClose={handleCancel}>
          <Box sx={filterStyles.drawerPaper}>
            <Box>
              <Box sx={filterStyles.filterHeading}>
                <Typography variant="h6" color="white">
                  Filter
                </Typography>
                <IconButton size="small">
                  <CloseIcon
                    onClick={handleCancel}
                    fontSize="small"
                    sx={{ color: "white" }}
                  />
                </IconButton>
              </Box>
              <Box sx={filterStyles.filterWrapper}>
                <Box sx={filterStyles.clearbutton}>
                  <Button
                    disabled={state.filterRows.length === 1 && isDisabled}
                    color="primary"
                    onClick={() => {
                      setState((prevState) => ({
                        ...prevState,
                        filterRows: [defaultRow],
                      }));
                      handleApplyFilter([]);
                    }}
                  >
                    Clear All
                  </Button>
                </Box>
                {state.filterRows.map((row, index) => {
                  const columnField = state.columnsList.find(
                    (item) => item.columnName === row.label
                  );
                  return (
                    <Box sx={filterStyles.filterContainer} key={index}>
                      {!!state.columnsList.length && (
                        <FormControl sx={filterStyles.input}>
                          <InputLabel
                            sx={filterStyles.inputLabel}
                            id="filter-label"
                          >
                            Select...
                          </InputLabel>
                          <Select
                            labelId="filter-label"
                            id="filter"
                            // size="small"
                            variant="outlined"
                            fullWidth
                            label="Select.."
                            value={row.label}
                            onChange={(selectedOption) => {
                              handleChange(
                                index,
                                "label",
                                selectedOption.target.value
                              );
                            }}
                            IconComponent={KeyboardArrowDownIcon}
                          >
                            {state.columnsList.map((item) => (
                              <MenuItem
                                key={item.columnName}
                                value={item.columnName}
                              >
                                {item.columnName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                      <FormControl sx={filterStyles.input}>
                        <InputLabel>Select...</InputLabel>
                        <Select
                          // size="small"
                          variant="outlined"
                          fullWidth
                          disabled={!row.label}
                          label="Select.."
                          value={row.type}
                          IconComponent={KeyboardArrowDownIcon}
                          onChange={(event) => {
                            handleChange(index, "type", event.target.value);
                          }}
                        >
                          {Object.keys(
                            OPERATOR_TYPE_LIST[columnField?.columnType] || {}
                          ).map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {!!columnField?.options?.length && (
                        <Select
                          sx={filterStyles.input}
                          variant="outlined"
                          fullWidth
                          disabled={!row.type || !row.label}
                          select={true}
                          label="Select.."
                          value={row.value}
                          onChange={(event) => {
                            handleChange(index, "value", event.target.value);
                          }}
                          IconComponent={KeyboardArrowDownIcon}
                        >
                          {columnField.options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                      {columnField?.isDateField && (
                        <Box sx={filterStyles.input}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                              open={state.currentRow == index}
                              label="Select date"
                              inputFormat="MM/dd/yyyy"
                              disabled={!row.type || !row.label}
                              value={row.value ? row.value : null}
                              onChange={(date) =>
                                handleChange(index, "value", date)
                              }
                              onOpen={() =>
                                setState((prevState) => ({
                                  ...prevState,
                                  currentRow: index,
                                }))
                              }
                              onClose={() =>
                                setState((prevState) => ({
                                  ...prevState,
                                  currentRow: null,
                                }))
                              }
                              renderInput={(params) => (
                                <Box
                                  onClick={() => {
                                    setState((prevState) => ({
                                      ...prevState,
                                      currentRow: index,
                                    }));
                                  }}
                                >
                                  <TextField
                                    {...params}
                                    sx={{ pointerEvents: "none" }}
                                  />
                                </Box>
                              )}
                            />
                          </LocalizationProvider>
                        </Box>
                      )}
                      {!columnField?.isDateField && !columnField?.options && (
                        <TextField
                          // size="small"
                          sx={filterStyles.input}
                          fullWidth
                          type="text"
                          disabled={!row.type || !row.label}
                          variant="outlined"
                          placeholder="Keyword..."
                          value={row.value}
                          onChange={(event) => {
                            let value = event.currentTarget.value;
                            handleChange(index, "value", value);
                          }}
                        />
                      )}
                      {state.filterRows.length > 1 && (
                        <IconButton onClick={() => handleDeleteRow(index)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      )}
                    </Box>
                  );
                })}
                <Button
                  startIcon={
                    <AddCircleIcon color={isDisabled ? "default" : "primary"} />
                  }
                  color="primary"
                  onClick={handleAddClick}
                  disabled={isDisabled}
                >
                  <Typography variant="button">Add Filter...</Typography>
                </Button>
              </Box>
            </Box>
            <Box sx={filterStyles.confirmBtn}>
              <Button
                variant="contained"
                color="primary"
                disabled={isDisabled}
                onClick={() => {
                  onFilterClose();
                  handleApplyFilter(state.filterRows);
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Drawer>
      </>
    </ClickAwayListener>
  );
};

export default Filter;
