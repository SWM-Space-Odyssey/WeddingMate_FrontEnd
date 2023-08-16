import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.pcss";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { globalTheme } from "./globalTheme.ts";
import { ThemeProvider } from "@mui/material/styles";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider theme={globalTheme}>
      <App />
    </ThemeProvider>
  </Provider>
);
