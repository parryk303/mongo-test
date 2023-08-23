import { globalStyles } from "@client/shared/constants";

const style = {
  root: {
    width: "100%",
  },
  container: {
    minHeight: 200,
    // maxHeight: 350,
    overflow: "auto",
    "& .MuiTable-stickyHeader": {
      borderCollapse: "collapse !important",
    },
  },
  paper: {
    width: "100%",
    marginBottom: 2,
  },
  table: {
    minWidth: 750,
    maxHeight: 300,
    overflow: "auto",
  },
  head: {
    "& th": {
      // backgroundColor: "grey.light",
    },
  },
  tableHeadCell: {
    // backgroundColor: "grey.light",
    "&:hover": {
      // backgroundColor: "grey.main",
      "& div[data-role='resize']": {
        visibility: "visible !important",
      },
    },
    "& .MuiTableSortLabel-icon": {
      color: "primary.main"
    }
  },
  row: {
    // borderBottom: `1px solid rgb(235, 235, 235)`,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  tableCell: {
    minWidth: 80,
    maxWidth: 250,
  },

  resizeIconWrapper: {
    width: 2,
    cursor: "col-resize",
    userSelect: "none",
    visibility: "hidden",
    right: 0,
    top: 0,
    bottom: 0,
  },
  resizeIcon: {
    opacity: 0.6,
    width: 2,
    height: 15,
  },
  resizeContainer: {
    ...globalStyles.display.flex,
    ...globalStyles.flex.justify.between,
    ...globalStyles.flex.align.center,
    position: "absolute",
  },
  disabled: {
    backgroundColor: "grey.100",
    color: "grey.500",
    cursor: "default",
    pointerEvents: "none",
  },
  noRecordsImg: {
    minHeight: 300,
    minWidth: 340,
  },
  paginationItems: {
    "&:hover": {
      backgroundColor: "primary.main",
      color: "white",
    },
  },
};

const paginationStyle = {
  root: {
    flexShrink: 0,
    marginLeft: 2.5,
  },
  cardViewWrapper: {
    overflow: "auto",
  },
};

export default style;
