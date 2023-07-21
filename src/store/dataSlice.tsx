import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
/**
 * Simple Redux Store Counter Example . . .
 * when you want to use this Store ...
 * you have 2 change {
 *  userState interface,
 *  initialState,
 *  userSlice-reducers
 * }
 *
 */

const initialState = {
  page: 0,
  prevPage: 0,
};

export const dataSlice = createSlice({
  name: "nicknameChanger",
  initialState,
  reducers: {
    NextPage: (state) => {
      console.log("REDUX NextPage" + state);
      state.prevPage = state.page;
      state.page += 1;
    },
    PrevPage: (state) => {
      console.log("Redux Logout", +state);
      if (state.page <= 0) return;
      state.prevPage = state.page;
      state.page -= 1;
    },
  },
});

export const { NextPage, PrevPage } = dataSlice.actions;

export const selectUsers = (state: RootState) => state.user;

export default dataSlice.reducer;
