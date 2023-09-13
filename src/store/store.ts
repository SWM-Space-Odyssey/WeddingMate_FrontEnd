import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storageSession from "redux-persist/lib/storage/session";
import viewReducer from "./viewSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  user: userReducer,
  view: viewReducer,
});
const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["user"],
};
const PersistReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: PersistReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
