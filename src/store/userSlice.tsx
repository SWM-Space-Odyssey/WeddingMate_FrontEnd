import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { tokenRefresh } from "../api/user";

interface userState {
  accessToken: string | null;
  type: "planner" | "couple" | null;
  nickname: string;
  plannerId?: number | null;
}

const initialState: userState = {
  accessToken: null,
  nickname: "",
  type: null,
};

export const userSlice = createSlice({
  name: "nicknameChanger",
  initialState,
  reducers: {
    resetAccessToken: (state) => {
      state.accessToken = null;
      localStorage.removeItem("accessToken");
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    setUserType: (state, action: PayloadAction<"planner" | "couple">) => {
      state.type = action.payload;
    },
    setUserNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },

    persistTest: (state) => {
      state.nickname = "persist";
    },
  },
});

export const {
  setAccessToken,
  setUserType,
  resetAccessToken,
  setUserNickname,
  persistTest,
} = userSlice.actions;

export const selectUsers = (state: RootState) => state.user;

export default userSlice.reducer;
