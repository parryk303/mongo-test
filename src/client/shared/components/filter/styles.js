import { globalStyles } from "@client/shared/constants";
const { display, flex, text } = globalStyles;

const filterStyles = {
  drawerPaper: {
    height: "100%",
    width: "540px",
    overflow: "auto",
    ...display.flex,
    flexDirection: "column",
    ...flex.justify.between,
  },
  filterWrapper: {
    padding: "12px 12px",
  },
  input: {
    minWidth: "140px",
    marginRight: "12px",
    backgroundColor: "grey.main",
  },
  filterButton: {
    height: "46px !important",
    minWidth: "36px !important",
    borderRadius: 8,
    padding: "5px 10px",
  },
  filterContainer: {
    marginBottom: 2,
    width: "100%",
    ...display.flex,
    ...flex.align.center,
  },
  filterHeading: {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px",
    backgroundColor: "primary.dark",
    marginBottom: "32px",
  },
  clearbutton: {
    width: "100%",
    ...text.align.right,
  },
  confirmBtn: {
    ...display.flex,
    ...flex.justify.end,
    padding: "12px 20px",
  },
};

export default filterStyles;
