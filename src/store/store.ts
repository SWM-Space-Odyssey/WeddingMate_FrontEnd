import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import viewReducer from "./viewSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    user: userReducer,
    view: viewReducer,
  },
});

export default store;
