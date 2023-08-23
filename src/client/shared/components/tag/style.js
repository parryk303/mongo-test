const style = {
  root: {
    display: "flex",
    boxSizing: "border-box",
    borderRadius: "5px",
    color: "common.white",
    fontSize: ({ size }) => {
      let fontSize = 14;
      switch (size) {
        case "small":
          fontSize = 10;
          break;
        case "medium":
          fontSize = 12;
          break;
        default:
          fontSize = 14;
      }
    },
    fontWeight: "300",
    height: "auto",
    padding: "0px 2px",
    pb: "2px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  icon: {
    marginRight: 1,
    height: ({ size }) => {
      let height = 14;
      switch (size) {
        case "small":
          height = 9;
          break;
        case "medium":
          height = 11;
          break;
        default:
          height = 14;
      }

      return height;
    },
  },
};

export default style;
