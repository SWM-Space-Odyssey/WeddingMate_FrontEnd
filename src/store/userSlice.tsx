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
  value: number;
}

const initialState: userState = {
  value: 0,
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;

export const selectUsers = (state: RootState) => state.counter.value;

export default userSlice.reducer;
