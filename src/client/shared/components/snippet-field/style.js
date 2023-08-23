import { globalStyles } from "@client/shared/constants";
const style = {
  chip: {
    background: "gray",
    color: "white",
  },
  chipIconWrapper: {
    height: 12,
    // background: theme.palette.common.white,
    background: "white",
    borderRadius: 8,
    padding: 2,
    width: 12,
    marginLeft: 3,
  },
  chipIcon: {
    height: 8,
    position: "relative",
    top: -9,
    left: 0,
  },
  wrapper: {
    border: `1px solid gray`,
    borderRadius: 1,
    // fontFamily: theme.palette.medium,
    fontSize: 14,
    padding: 5,
    position: "relative",
    "&:focus": {
      //   border: `2px solid ${theme.palette.primary.main}`,
    },
  },
  input: {
    flex: 1,
    outline: "none",
    wordBreak: "break-all",
  },
  label: {
    // background: theme.palette.common.white,
    backgroundColor: "white !important",
    // ...globalStyles.background.color.primary,
    // color: theme.palette.grey[500],
    color: "gray",
    fontSize: 14,
    // fontFamily: theme.font.regular,
    left: 6,
    padding: "0 4px",
    position: "absolute",
    top: -10,
  },
  snippet: {
    // backgroundColor: "red",
    borderRadius: 28,
    color: "white",
    height: 20,
    // fontFamily: theme.font.regular,
    minWidth: 50,
    padding: "2px 8px",
    width: "max-content",
  },
  snippetsWrapper: {},
};
export default style;
