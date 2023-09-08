import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface userState {
  accessToken: string | null;
  type: "planner" | "couple" | null;
  plannerId?: number | null;
}

const initialState: userState = {
  accessToken: null,
  type: null,
};

export const userSlice = createSlice({
  name: "nicknameChanger",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    setUserType: (state, action: PayloadAction<"planner" | "couple">) => {
      state.type = action.payload;
    },
  },
});

export const { setAccessToken, setUserType } = userSlice.actions;

export const selectUsers = (state: RootState) => state.user;

export default userSlice.reducer;
