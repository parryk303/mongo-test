import React, { useState, createRef } from "react";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Tooltip from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Pagination } from "@client/shared/components";
import { noop } from "@client/shared/constants";
import Loader from "./loader";
import style from "./style";
import { globalStyles } from "@client/shared/constants";
import { Skeleton } from "@mui/material";

const defaultState = {
  selectedRows: [],
  areAllSelected: false,
};

const Grid = ({
  columns = [],
  id = "none",
  rows = [],
  order = null,
  orderBy = null,
  pageSize = 5,
  pageNumber = 1,
  hasLoader = true,
  disabled = false,
  isLoading = false,
  hasSelection = true,
  hasSelectMultiple = true,
  hasSelectAll = true,
  rowCount = null,
  isFormVisible = false,
  hasPagination = true,
  classes: passedClasses = {},
  totalRows = 0,
  onSelectAll = noop,
  onPageSizeChange = noop,
  onPageNumberChange = noop,
  onSortChange = noop,
  onSelectionChange = noop,
  onReady = noop,
  entriesText = "Entries",
  loaderConfig = {},
  paginationElevation = 0,
}) => {
  const [state, setState] = useState(defaultState);
  const columnRefs = [];
  const handleSelectVisibleChange = (event) => {
    const isChecked = event.currentTarget.checked;
    let selectedRows = [];
    if (isChecked) {
      selectedRows = rows.map((row) => row.id);
    }
    selectedRows = selectedRows.map((row) => row.id || row)
    onSelectionChange(selectedRows);
    setState((prevState) => ({
      ...prevState,
      selectedRows,
    }));
  };

  const handleSortClick = (columnId) => {
    let newOrder = "DESC";
    if (order === "DESC") {
      newOrder = "ASC";
    } else {
      if (order === "ASC") {
        newOrder = null;
      }
    }

    if (columnId !== orderBy) {
      newOrder = "DESC";
    }

    const column = columns.find((column) => column.id === columnId);
    onSortChange(column, newOrder);
  };

  const handleSelection = (rowId) => {
    setState((prevState) => {
      const existingSelectionIndex = prevState.selectedRows.indexOf(rowId);
      let selectedRows = prevState.selectedRows.slice();
      if (existingSelectionIndex === -1) {
        selectedRows.push(rowId);
      } else {
        selectedRows.splice(existingSelectionIndex, 1);
      }
      onSelectionChange(selectedRows);

      return {
        ...prevState,
        selectedRows,
      };
    });
  };

  const createSelectionHandler = (rowId) => {
    return (event) => {
      handleSelection(rowId, event);
    };
  };

  onReady({
    resetAllSelection: () =>
      setState((prevState) => ({ ...prevState, areAllSelected: false })),
    resetSelection: () =>
      setState((prevState) => ({
        ...prevState,
        selectedRows: [],
      })),
    setSelection: (selectedRows) =>
      setState((prevState) => ({
        ...prevState,
        selectedRows,
      })),

    getSelection: () => state.selectedRows,
  });
  return (
    <Box
      sx={{
        ...style.root,
      }}
    >
      <TableContainer
        sx={{
          ...(passedClasses.container || {}),
          ...(rows.length > 0 ? style.container : {}),
        }}
      >
        {hasLoader && isLoading ? (
          <Loader columns={columns.length} />
        ) : (
          <>
            <Table stickyHeader id={id}>
              <TableHead
                sx={{
                  ...style.head,
                }}
              >
                <TableRow
                  sx={{
                    ...style.row,
                    ...(passedClasses.header || {}),
                    ...(disabled ? style.disabled : {}),
                  }}
                >
                  {hasSelection && (
                    <TableCell
                      padding="checkbox"
                      sx={{
                        ...globalStyles.border.noBorder,
                      }}
                    >
                      {hasSelectMultiple && (
                        <Checkbox
                          indeterminate={
                            state.selectedRows.length > 0 &&
                            state.selectedRows.length < rows.length
                          }
                          checked={
                            rows.length > 0 &&
                            (state.selectedRows.length === rows.length ||
                              state.areAllSelected)
                          }
                          disabled={disabled}
                          onChange={handleSelectVisibleChange}
                          inputProps={{ "aria-label": "select visible" }}
                        />
                      )}
                    </TableCell>
                  )}
                  {columns.map((column, columnIndex) => {
                    columnRefs[columnIndex] = createRef();
                    if (column.isHidden) {
                      return null;
                    }
                    let content = <span></span>;
                    if (column.renderHeader) {
                      content = column.renderHeader();
                    } else {
                      content = column.canSort ? (
                        <Box>
                          <TableSortLabel
                            active={orderBy === column.id}
                            key={column.id}
                            direction={
                              orderBy === column.id
                                ? (order || "").toLowerCase()
                                : "asc"
                            }
                            onClick={() => handleSortClick(column.id)}
                          >
                            <Typography
                             variant="h6"
                              sx={{
                                fontFamily: 'inter_semibold'
                              }}
                              >
                              {column.label}
                              {orderBy === column.id ? (
                                <Box
                                  sx={{
                                    ...style.visuallyHidden,
                                  }}
                                >
                                  {order === "desc"
                                    ? "sorted descending"
                                    : "sorted ascending"}
                                </Box>
                              ) : null}
                            </Typography>
                          </TableSortLabel>
                        </Box>
                      ) : (
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: 'inter_semibold'
                          }}
                        >
                          {column.label}
                        </Typography>
                      );
                    }

                    return (
                      <TableCell
                        key={column.id}
                        align={column.numeric ? "right" : "left"}
                        padding={column.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === column.id ? order : false}
                        sx={{
                          ...style.tableCell,
                          ...globalStyles.border.noBorder,
                          ...style.tableHeadCell,
                          ...(column.headerClassName || {}),
                        }}
                        ref={columnRefs[columnIndex]}
                      >
                        <Tooltip
                          title={column.tooltip || column.label}
                          placement={column.tooltipPlacement || "top-start"}
                        >
                          <div>
                            {content}
                            {!column.noResize && (
                              <div
                                style={{
                                  ...style.resizeContainer,
                                  ...style.resizeIconWrapper,
                                }}
                                data-role="resize"
                                onMouseDown={(event) => {
                                  if (
                                    columnRefs[columnIndex] &&
                                    columnRefs[columnIndex].current
                                  ) {
                                    const element =
                                      columnRefs[columnIndex].current;
                                    document.onmouseup = () => {
                                      document.onmousemove = null;
                                    };

                                    document.onmousemove = (() => {
                                      const initialCursorX = event.pageX;
                                      const initialWidth =
                                        element.offsetWidth;
                                      return (event) => {
                                        if (initialCursorX) {
                                          const diffX =
                                            event.pageX - initialCursorX;
                                          element.style.minWidth = `${initialWidth + diffX
                                            }px`;
                                          element.style.maxWidth = `${initialWidth + diffX
                                            }px`;
                                        }
                                      };
                                    })();
                                  }
                                }}
                                onMouseUp={() => {
                                  console.log("Fired local");
                                  document.onmousemove = null;
                                }}
                              >
                                <Box sx={style.resizeIcon} />
                              </div>
                            )}
                          </div>
                        </Tooltip>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody sx={passedClasses.bgColor || {}}>
                {!isLoading && rows.length === 0 && (
                  <TableCell colSpan={columns.length}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        ml: 16,
                        p: 2,
                      }}
                    >
                      <img
                        alt=""
                        style={{
                          ...style.noRecordsImg,
                        }}
                        src="/assets/no-records.png"
                      />
                      <Typography
                        variant="h5"
                        sx={{
                          color: "primary.dark",
                          mt: 2,
                          ml: 4,
                          fontWeight: "medium",
                        }}
                      >
                        No records available.
                      </Typography>
                    </Box>
                  </TableCell>
                )}
                {rows.map((row, rowIndex) => {
                  let content = <></>;
                  const selectionHandler = createSelectionHandler(row.id);
                  if (rows.render) {
                    content = rows.render();
                  } else {
                    const labelId = `table-checkbox-${rowIndex}`;

                    content = (
                      <>
                        {hasSelection && (
                          <TableCell
                            padding="checkbox"
                            sx={{
                              ...globalStyles.border.noBorder,
                              pl: row.hasIndentation ? "38px" : "4px",
                            }}
                          >
                            <Checkbox
                              checked={
                                state.selectedRows.indexOf(row.id) !== -1 ||
                                state.areAllSelected
                              }
                              inputProps={{ "aria-labelledby": labelId }}
                              onChange={selectionHandler}
                            />
                          </TableCell>
                        )}
                        {columns.map((column, columnIndex) => {
                          if (column.isHidden) {
                            return null;
                          }
                          const isCellLoading = loaderConfig?.cell?.some(
                            ({ x, y }) => x === rowIndex && y === columnIndex
                          );
                          let content = isCellLoading ? (
                            <Skeleton />
                          ) : (
                            <Typography
                              sx={{
                                ...globalStyles.display.inlineBlock,
                                ...globalStyles.width["100"],
                              }}
                              variant="body2"
                              component="span"
                              noWrap={column.hasEllipses}
                            >
                              {row[column.field] || ""}
                            </Typography>
                          );
                          if (column.render) {
                            content = isCellLoading ? (
                              <Skeleton />
                            ) : (
                              column.render(row, rowIndex)
                            );
                          }

                          return (
                            <TableCell
                              sx={{
                                ...globalStyles.border.noBorder,
                                ...style.tableCell,
                                ...(column.className || {}),
                              }}
                              key={`${column.label || "grid-column"
                                }-${columnIndex}${row.id}`}
                            >
                              {column.render ? (
                                <>{content}</>
                              ) : (
                                <Tooltip
                                  title={row[column.field] || ""}
                                  placement={
                                    column.dataTooltipPlacement || "top-start"
                                  }
                                >
                                  {content}
                                </Tooltip>
                              )}
                            </TableCell>
                          );
                        })}
                      </>
                    );
                  }
                  const isRowLoading = (loaderConfig?.rows || []).some((item) => item === rowIndex);
                  if (isRowLoading) {
                    return (
                      <TableRow>
                        <TableCell colSpan={columns.length} >
                          <Skeleton height={52} />
                        </TableCell>
                      </TableRow>
                    );
                  }
                  return (
                    <TableRow
                      hover
                      key={row.id}
                      sx={{
                        ...style.row,
                        ...(passedClasses.row || {}),
                        ...(row.className || {}),
                        ...(row.isDisabled ? style.disabled : {}),
                      }}
                    >
                      {content}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </>
        )}
      </TableContainer>
      {hasPagination && (
        <Pagination
          elevation={paginationElevation}
          elements={[
            <div
              style={{
                ml: 4,
                ...globalStyles.display.flex,
                ...globalStyles.flex.align.center,
              }}
            >
              {hasSelection && hasSelectMultiple && hasSelectAll && (
                <div
                  key={"select-all"}
                  sx={{
                    mt: 2,
                    ...globalStyles.display.flex,
                    ...globalStyles.flex.align.center,
                  }}
                >
                  <Button
                    sx={{
                      ml: 5,
                      mr: 5,
                      ...style.paginationItems,
                      ...globalStyles.text.color.primary,
                      ...(state.areAllSelected
                        ? globalStyles.background.color.primary.main
                        : {}),
                      ...(state.areAllSelected
                        ? globalStyles.text.color.white
                        : {}),
                    }}
                    disableRipple
                    onClick={() => {
                      onSelectAll(!state.areAllSelected);
                      setState((prevState) => ({
                        ...prevState,
                        areAllSelected: !prevState.areAllSelected,
                        selectedRows: !state.areAllSelected
                          ? rows.map((row) => row.id)
                          : [],
                      }));
                    }}
                    disabled={disabled}
                    variant="text"
                  >
                    Select All
                  </Button>
                  {(state.areAllSelected || state.selectedRows.length > 0) && (
                    <Typography
                      sx={{
                        ml: 3,
                        ...globalStyles.text.color.primary,
                        ...globalStyles.display.inlineBlock,
                      }}
                      disabled={disabled}
                      variant="body2"
                    >
                      {state.areAllSelected
                        ? "All Entries "
                        : state.selectedRows.length > 1
                          ? `${state.selectedRows.length} Entries `
                          : "1 Entry "}
                      Selected
                    </Typography>
                  )}
                </div>
              )}
            </div>,
          ]}
          onPageNumberChange={onPageNumberChange}
          onPageSizeChange={onPageSizeChange}
          pageNumber={pageNumber}
          pageSize={pageSize}
          rowCount={
            rowCount ? rowCount : isFormVisible ? rows.length - 1 : rows.length
          }
          disabled={disabled}
          total={totalRows}
          entriesText={entriesText}
        />
      )}
    </Box>
  );
};

export default Grid;
