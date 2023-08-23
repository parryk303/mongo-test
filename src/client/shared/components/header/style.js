import { globalStyles } from "@client/shared/constants";
const { display, flex } = globalStyles;
const style = {
  drawerPaper: {
    height: "100%",
    width: "250px",
  },
  nameWrapper: {
    padding: "12px 14px",
    marginBottom: "16px",
    // backgroundColor: "primary.main",
    ...display.flex,
  },
  icon: {
    color: "black",
    ...flex.justify.end,
  },
  role: {
    fontSize: "12px",
  },
  userData: {
    marginLeft: "18px",
    // color: "white",
  }
};

export default style;
