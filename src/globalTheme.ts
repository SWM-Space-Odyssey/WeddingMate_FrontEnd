import { createTheme } from "@mui/material/styles";

export const globalTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
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
  typography: {
    fontFamily: ["AppleSDGothicKR", "Noto Sans KR", "sans-serif"].join(","),
  },
});
