import { globalStyles } from "@client/shared/constants";
const { display, flex, cursor } = globalStyles;

const paginationStyle = {
  wrapper: {
    padding: "18px",
    ...display.flex,
    ...flex.align.center,
    ...flex.justify.between,
  },
  content: {
    ...display.flex,
    ...flex.align.center,
  },
  activePageNumber: {
    background: "primary.main",
    borderRadius: 4,
    color: "common.white",
    padding: "2px 8px 0px",
    position: "unset",
  },
  controlWrapper: {
    "& img": {
      width: 16,
    },
  },
  invertedIcon: {
    transform: "rotate(180deg)",
    bottom: "unset",
  },
  pageNumberInput: {
    display: "inline-block",
    width: 18,
    marginTop: 0,
    marginBottom: 0,
    "& input": {
      padding: 0,
      textAlign: "center",
    },
  },
  pageSizeIcon: {
    bottom: 8,
    width: 8,
  },

  pageSizeDropdown: {
    maxHeight: 300,
  },
  nextButton: {
    marginRight: "14px",
    marginLeft: "14px",
  },
  spacing: {
    marginLeft: "8px",
  },
  show: {
    ...display.flex,
    ...flex.align.center,
  },
  rowsPerPage: {
    backgroundColor: "grey.main",
    marginLeft: "8px",
    marginRight: "24px",
    minWidth: "65px",
  },
  totalItems: {
    marginRight: "18px",
    ...display.flex,
    ...flex.align.center,
    ...flex.justify.end,
  },
  pageNumbersContainer: {
    marginRight: "8px",
    marginLeft: "8px",
    ...display.flex,
    ...flex.align.center,
  },
  pageNumber: {
    marginRight: "8px",
    marginLeft: "8px",
    ...cursor.pointer,
  },
  prevBtn: {
    transform: "rotate(180deg)",
    height: "24px",
    width: "24px",
  },
  nextBtn: { height: "24px", width: "24px" },
  disabled: {
    color: "grey.500",
    cursor: "default",
    pointerEvents: "none",
  },
};

export default paginationStyle;
