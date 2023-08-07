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
interface userState {
  accessToken: string | null;
  type: "planner" | "couple" | null;
  nickname: string | null;
  company?: string | null;
  grade?: string | null;
  location?: string | null;
}

const initialState: userState = {
  accessToken: null,
  type: null,
  nickname: null,
  company: null,
  grade: null,
  location: null,
};

export const userSlice = createSlice({
  name: "nicknameChanger",
  initialState,
  reducers: {
    ReduxLogin: (state) => {
      console.log("REDUX Login" + state);
      state.nickname = "Logined";
    },
    ReduxLogout: (state) => {
      console.log("Redux Logout", +state);
      state.nickname = "EMPTY";
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },

    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { ReduxLogin, ReduxLogout, setAccessToken } = userSlice.actions;

export const selectUsers = (state: RootState) => state.user.nickname;

export default userSlice.reducer;
