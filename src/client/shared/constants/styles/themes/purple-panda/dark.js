import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  font: {
    regular: "proxima_novaregular",
    medium: "proxima_novamedium",
    bold: "proxima_novabold",
    light: "proxima_novalight",
    semiBold: "proxima_novasemibold",
    secondary: "Lato",
    tertiary: "Roboto, sans-serif",
  },
  name: "Purple Panda",
  cardIcon: {
    enabledBackground: "rgba(199, 180, 248, 0.27)",
    disabledBackground: "rgb(220, 221, 225)",
  },
  palette: {
    type: "dark",
    background: {
      body: "#f6f6f7",
    },
    primary: {
      light: "#c67af3",
      dark: "#4f0982",
      main: "#7c4cdb",
    },
    secondary: {
      // light: '#64b5f6',
      main: "#0099fe",
      // dark: '#1976d2',
    },
    info: {
      main: "#dcdde1",
    },
    grey: {
      100: "#f5f6fb",
      A800: "#7c8fa8",
    },
  },
  typography: {
    fontFamily: "proxima_novaregular",
    button: {
      textTransform: "none",
      fontWeight: "bold",
    },
  },
  spacing: 4,
});

export default responsiveFontSizes(theme);
