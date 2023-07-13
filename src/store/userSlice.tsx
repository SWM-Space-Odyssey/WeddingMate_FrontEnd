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
  nickname: string;
}

const initialState: userState = {
  nickname: "init",
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

    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { ReduxLogin, ReduxLogout } = userSlice.actions;

export const selectUsers = (state: RootState) => state.user.nickname;

export default userSlice.reducer;
