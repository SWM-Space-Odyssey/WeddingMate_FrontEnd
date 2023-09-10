import { createTheme } from "@mui/material/styles";

export const globalTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "#FFFFFF",
        },
      },
    },

    MuiBadge: {
      styleOverrides: {
        badge: {
          padding: 0,
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#FF6A6A",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});
