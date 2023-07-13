import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
