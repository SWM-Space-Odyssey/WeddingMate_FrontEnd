import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.pcss";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { globalTheme } from "./globalTheme.ts";
import { ThemeProvider } from "@mui/material/styles";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
export const persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={globalTheme}>
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
