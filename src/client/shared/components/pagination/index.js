import React, { useState, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import paginationStyle from "./style";

const noop = () => {};

const Pagination = ({
  classes: passedClasses = {},
  className = "",
  disabled = false,
  elements = [],
  hiddenCount = null,
  onPageNumberChange = noop,
  onPageSizeChange = noop,
  pageNumber = 1,
  pageSize = 5,
  rowCount = 5,
  total = 0,
  entriesText = "Entries",
  elevation = 1
}) => {
  const [state, setState] = useState({
    inputValue: "",
    error: null,
  });
  const lastPage = useMemo(() => {
    if (pageSize === -1) {
      return 1;
    }
    return Math.ceil(total / pageSize);
  }, [pageSize, total]);

  useEffect(() => {
    if (pageSize === -1) {
      onPageSizeChange(5);
    }
    return () => {
      setState({
        inputValue: "",
        error: "",
      });
    };
  }, []);
  useEffect(() => {
    if (pageNumber !== 1 && pageNumber !== lastPage && !state.inputValue) {
      setState((prevState) => ({
        inputValue: pageNumber,
        error: null,
      }));
    }
    // eslint-disable-next-line
  }, [pageNumber, lastPage]);

  const goToFirstPage = () => {
    if (pageNumber === 1) {
      return;
    }

    onPageNumberChange(1);
  };

  const goToLastPage = () => {
    if (pageNumber === lastPage) {
      return;
    }

    onPageNumberChange(lastPage);
  };

  const goToNextPage = () => {
    if (pageNumber === lastPage) {
      return;
    }

    onPageNumberChange(++pageNumber);
  };

  const goToPreviousPage = () => {
    if (pageNumber === 1) {
      return;
    }

    onPageNumberChange(--pageNumber);
  };
  const options = [
    {
      label: "5 Rows",
      value: "5",
      isDisabled: pageSize === 5,
      isSelected: pageSize === 5,
    },
    {
      label: "10 Rows",
      value: "10",
      isDisabled: pageSize === 10,
      isSelected: pageSize === 10,
    },
    {
      label: "20 Rows",
      value: "20",
      isDisabled: pageSize === 20,
      isSelected: pageSize === 20,
    },
    {
      label: "30 Rows",
      value: "30",
      isDisabled: pageSize === 30,
      isSelected: pageSize === 30,
    },
    {
      label: "40 Rows",
      value: "40",
      isDisabled: pageSize === 40,
      isSelected: pageSize === 40,
    },
    {
      label: "50 Rows",
      value: "50",
      isDisabled: pageSize === 50,
      isSelected: pageSize === 50,
    },
    {
      label: "100 Rows",
      value: "100",
      isDisabled: pageSize === 100,
      isSelected: pageSize === 100,
    },
    {
      label: "150 Rows",
      value: "150",
      isDisabled: pageSize === 150,
      isSelected: pageSize === 150,
    },
    {
      label: "200 Rows",
      value: "200",
      isDisabled: pageSize === 200,
      isSelected: pageSize === 200,
    },
    {
      label: "250 Rows",
      value: "250",
      isDisabled: pageSize === 250,
      isSelected: pageSize === 250,
    },
    {
      label: "300 Rows",
      value: "300",
      isDisabled: pageSize === 300,
      isSelected: pageSize === 300,
    },
  ];
  if (total === 0) {
    return <></>;
  }

  return (
    <Box sx={paginationStyle.wrapper} component={Paper} elevation={elevation}>
      <Box sx={paginationStyle.content}>
        <IconButton
          size="small"
          onClick={goToFirstPage}
          disabled={pageNumber === 1 || lastPage === 1 || disabled}
          sx={paginationStyle.nextButton}
        >
          <img
            alt="Go to first page"
            src={
              pageNumber === 1 || lastPage === 1
                ? "/assets/last-page-disabled.svg"
                : "/assets/last-page.svg"
            }
            style={paginationStyle.prevBtn}
          />
        </IconButton>
        <IconButton
          size="small"
          onClick={goToPreviousPage}
          disabled={pageNumber === 1 || lastPage === 1 || disabled}
          sx={paginationStyle.nextButton}
        >
          <img
            alt="Go to previous page"
            src={
              pageNumber === 1 || lastPage === 1
                ? "/assets/next-disabled.svg"
                : "/assets/next.svg"
            }
            style={paginationStyle.prevBtn}
          />{" "}
        </IconButton>
        <Box sx={paginationStyle.pageNumbersContainer}>
          {pageNumber !== 1 && (
            <Typography
              variant="body1"
              sx={{
                ...paginationStyle.pageNumber,
                ...(disabled ? paginationStyle.disabled : {}),
              }}
              onClick={() => onPageNumberChange(1)}
            >
              1
            </Typography>
          )}

          {pageNumber > 6 && (
            <Typography
              variant="body1"
              sx={{
                ...paginationStyle.pageNumber,
                ...(disabled ? paginationStyle.disabled : {}),
              }}
            >
              ...
            </Typography>
          )}

          {pageNumber - 4 > 1 && (
            <Typography
              variant="body1"
              sx={{
                ...paginationStyle.pageNumber,
                ...(disabled ? paginationStyle.disabled : {}),
              }}
              onClick={() => onPageNumberChange(pageNumber - 4)}
            >
              {pageNumber - 4}
            </Typography>
          )}

          {pageNumber - 3 > 1 && (
            <Typography
              variant="body1"
              sx={{
                ...paginationStyle.pageNumber,
                ...(disabled ? paginationStyle.disabled : {}),
              }}
              onClick={() => onPageNumberChange(pageNumber - 3)}
            >
              {pageNumber - 3}
            </Typography>
          )}

          {pageNumber - 2 > 1 && (
            <Typography
              variant="body1"
              sx={{
                ...paginationStyle.pageNumber,
                ...(disabled ? paginationStyle.disabled : {}),
              }}
              onClick={() => onPageNumberChange(pageNumber - 2)}
            >
              {pageNumber - 2}
            </Typography>
          )}

          {pageNumber - 1 > 1 && (
            <Typography
              variant="body1"
              sx={{
                ...paginationStyle.pageNumber,
                ...(disabled ? paginationStyle.disabled : {}),
              }}
              onClick={() => onPageNumberChange(pageNumber - 1)}
            >
              {pageNumber - 1}
            </Typography>
          )}

          <Typography
            variant="body1"
            sx={{
              ...paginationStyle.pageNumber,
              ...(disabled ? paginationStyle.disabled : {}),
            }}
            // onClick={() => onPageNumberChange(pageNumber)}
            // disabled
            color="primary"
          >
            {pageNumber}
          </Typography>

          {pageNumber + 1 < lastPage && (
            <Typography
              variant="body1"
              sx={{
                ...paginationStyle.pageNumber,
                ...(disabled ? paginationStyle.disabled : {}),
              }}
              onClick={() => onPageNumberChange(pageNumber + 1)}
            >
              {pageNumber + 1}
            </Typography>
          )}

          {pageNumber + 2 < lastPage && (
            <Typography
              variant="body1"
              sx={{
                ...paginationStyle.pageNumber,
                ...(disabled ? paginationStyle.disabled : {}),
              }}
              onClick={() => onPageNumberChange(pageNumber + 2)}
            >
              {pageNumber + 2}
            </Typography>
          )}

          {pageNumber + 3 < lastPage && (
            <Typography
              variant="body1"
              sx={{
                ...paginationStyle.pageNumber,
                ...(disabled ? paginationStyle.disabled : {}),
              }}
              onClick={() => onPageNumberChange(pageNumber + 3)}
            >
              {pageNumber + 3}
            </Typography>
          )}

          {pageNumber + 4 < lastPage && (
            <Typography
              variant="body1"
              sx={{
                ...paginationStyle.pageNumber,
                ...(disabled ? paginationStyle.disabled : {}),
              }}
              onClick={() => onPageNumberChange(pageNumber + 4)}
            >
              {pageNumber + 4}
            </Typography>
          )}

          {pageNumber < lastPage - 5 && (
            <Typography variant="body1">...</Typography>
          )}

          {pageNumber !== lastPage && (
            <Typography
              variant="body1"
              sx={{
                ...paginationStyle.pageNumber,
                ...(disabled ? paginationStyle.disabled : {}),
              }}
              onClick={() => onPageNumberChange(lastPage)}
            >
              {lastPage}
            </Typography>
          )}
        </Box>
        <IconButton
          size="small"
          variant="contained"
          disabled={lastPage === 1 || pageNumber === lastPage || disabled}
          onClick={goToNextPage}
          sx={paginationStyle.nextButton}
        >
          <img
            alt="Go to next page"
            src={
              lastPage === 1 || pageNumber === lastPage
                ? "/assets/next-disabled.svg"
                : "/assets/next.svg"
            }
            style={paginationStyle.nextBtn}
          />
        </IconButton>
        <IconButton
          size="small"
          onClick={goToLastPage}
          disabled={pageNumber === lastPage || lastPage === 1 || disabled}
          sx={paginationStyle.nextButton}
        >
          <img
            alt="Go to last page"
            src={
              lastPage === 1 || pageNumber === lastPage
                ? "/assets/last-page-disabled.svg"
                : "/assets/last-page.svg"
            }
            style={paginationStyle.nextBtn}
          />
        </IconButton>
        <Box>{elements.map((element) => element)}</Box>
      </Box>
      <Box
        sx={{
          ...paginationStyle.show,
          ...(disabled ? paginationStyle.disabled : {}),
        }}
      >
        <Typography variant="body2">Rows per page:</Typography>
        <Select
          size="small"
          value={pageSize}
          onChange={(selection) => {
            onPageSizeChange(parseInt(selection.target.value));
          }}
          disabled={disabled}
          sx={paginationStyle.rowsPerPage}
          IconComponent={KeyboardArrowDownIcon}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
        <Box sx={paginationStyle.totalItems}>
          <Typography variant="body2">{entriesText}:</Typography>
          <Typography
            color="primary"
            sx={{
              ...paginationStyle.spacing,
              ...(disabled ? paginationStyle.disabled : {}),
            }}
            variant="body2"
          >
            {total}
          </Typography>
        </Box>
        {hiddenCount !== null && (
          <Box data-testid="pagination-hidden-count">
            <Typography variant="caption">Hidden: {hiddenCount}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Pagination;
