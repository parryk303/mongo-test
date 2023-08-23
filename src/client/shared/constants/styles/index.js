export * from "./themes";

export const globalStyles = {
  display: {
    block: {
      display: "block",
    },
    flex: {
      display: "flex",
    },
    inline: {
      display: "inline",
    },
    inlineBlock: {
      display: "inline-block",
    },
    none: {
      display: "none",
    },
  },
  flex: {
    direction: {
      column: {
        flexDirection: "column",
      },
      row: {
        flexDirection: "row",
      },
    },
    wrap: {
      noWrap: {
        flexWrap: "no-wrap",
      },
      wrap: {
        flexWrap: "wrap",
      },
    },
    justify: {
      center: {
        justifyContent: "center",
      },
      start: {
        justifyContent: "flex-start",
      },
      end: {
        justifyContent: "flex-end",
      },
      between: {
        justifyContent: "space-between",
      },
      around: {
        justifyContent: "space-around",
      },
      evenly: {
        justifyContent: "space-evenly",
      },
    },
    align: {
      center: {
        alignItems: "center",
      },
      end: {
        alignItems: "flex-end",
      },
      start: {
        alignItems: "flex-start",
      },
    },
    expand: {
      flex: 1,
    },
  },
  text: {
    align: {
      center: {
        textAlign: "center",
      },
      left: {
        textAlign: "center",
      },
      right: {
        textAlign: "right",
      },
    },
    color: {
      primary: {
        color: "primary.main",
      },
      default: {
        color: "text.primary",
      },
      secondaryText: {
        color: "text.secondary",
      },
      secondary: {
        color: "secondary.main",
      },
      error: {
        color: "error.main",
      },
      success: {
        color: "success.main",
      },
      warning: {
        color: "warning.main",
      },
      white: {
        color: "#fff !important"
      },
      disabled: {
        color: "grey.400",
      }
    },
    weight: {
      bold: {
        fontWeight: "bold"
      },
    }
  },
  background: {
    color: {
      primary: {
        light: {
          backgroundColor: "primary.light",
        },
        main: {
          backgroundColor: "primary.main",
        },
        dark: {
          backgroundColor: "primary.dark",
        },
      },
      secondary: {
        light: {
          backgroundColor: "secondary.light",
        },
        main: {
          backgroundColor: "secondary.main",
        },
        dark: {
          backgroundColor: "secondary.dark",
        },
      },
      warning: {
        light: {
          backgroundColor: "warning.light",
        },
        main: {
          backgroundColor: "warning.main",
        },
        dark: {
          backgroundColor: "warning.dark",
        },
      },
      error: {
        light: {
          backgroundColor: "error.light",
        },
        main: {
          backgroundColor: "error.main",
        },
        dark: {
          backgroundColor: "error.dark",
        },
      },
    },
  },
  width: {
    15: {
      width: "15%",
    },
    25: {
      width: "25%",
    },
    35: {
      width: "35%",
    },
    45: {
      width: "45%",
    },
    50: {
      width: "50%",
    },
    60: {
      width: "60%",
    },
    65: {
      width: "65%",
    },
    70: {
      width: "70%",
    },
    75: {
      width: "75%",
    },
    80: {
      width: "80%",
    },
    90: {
      width: "90%",
    },
    100: {
      width: "100%",
    },
  },
  height: {
    15: {
      height: "15%",
    },
    25: {
      height: "25%",
    },
    35: {
      height: "35%",
    },
    45: {
      height: "45%",
    },
    50: {
      height: "50%",
    },
    60: {
      height: "60%",
    },
    65: {
      height: "65%",
    },
    70: {
      height: "70%",
    },
    75: {
      height: "75%",
    },
    80: {
      height: "80%",
    },
    90: {
      height: "90%",
    },
    100: {
      height: "100%",
    },
  },
  cursor: {
    pointer: { cursor: "pointer !important" },
    default: { cursor: "default !important" },
  },
  border: {
    noBorder: {
      border: "0 !important",
    }
  }
};
