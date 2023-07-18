import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.pcss";
import { Provider } from "react-redux";
import store from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);