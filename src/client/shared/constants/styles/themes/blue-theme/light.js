import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  font: {
    regular: "inter_regular",
    medium: "inter_medium",
    bold: "inter_bold",
    light: "inter_light",
    semiBold: "inter_semibold",
    secondary: "Lato",
    tertiary: "Roboto, sans-serif",
  },
  name: "Blue Theme",
  cardIcon: {
    enabledBackground: "rgba(199, 180, 248, 0.27)",
    disabledBackground: "rgb(220, 221, 225)",
  },
  palette: {
    background: {
      body: "#f6f6f7",
    },
    primary: {
      light: "#66B2FF",
      dark: "#0058b2",
      main: "#2470AC",
    },
    secondary: {
      main: "#2470AC",
      light: "#ba68c8",
      dark: "#7b1fa2",
    },
    info: {
      main: "#dcdde1",
    },
    grey: {
      100: "#f5f6fb",
      A800: "#7c8fa8",
      light: "#F3F6F9",
      main: "#E7EBF0",
      dark: "#1A2027",
    },
  },
  typography: {
    fontFamily: "inter_regular",
    button: {
      textTransform: "none",
      fontWeight: "bold",
    },
  },
  spacing: 4,
});

export default responsiveFontSizes(theme);
