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

interface viewState {
  currentView: string;
  viewStack: string[];
  page: number;
  prevPage: number;
}

const initialState: viewState = {
  currentView: "LandingPage",
  viewStack: [],
  page: 0,
  prevPage: 0,
};

export const viewSlice = createSlice({
  name: "viewChanger",
  initialState,
  reducers: {
    NextPage: (state) => {
      console.log("REDUX NextPage" + state);
      state.prevPage = state.page;
      state.page += 1;
    },
    PrevPage: (state) => {
      if (state.currentView === "Regist" && state.page !== 0) {
        state.page -= 1;
        state.prevPage -= 1;
        return;
      }

      const prevPage = state.viewStack.pop();
      console.log(prevPage);
      if (prevPage) {
        state.currentView = prevPage;
      }
    },
    intoItemCreatePage: (state) => {
      state.viewStack.push(state.currentView);
      state.currentView = "ItemCreate";
    },
    intoRegistPage: (state) => {
      state.viewStack.push(state.currentView);
      state.currentView = "Regist";
    },
    intoPortfolioCreatePage: (state) => {
      state.viewStack.push(state.currentView);
      state.currentView = "PortfolioCreate";
    },
    intoPortfolioPage: (state) => {
      state.viewStack.push(state.currentView);
      state.currentView = "Portfolio";
    },
    intoItemPage: (state) => {
      state.viewStack.push(state.currentView);
      state.currentView = "Item";
    },
  },
});

export const {
  NextPage,
  PrevPage,
  intoItemCreatePage,
  intoRegistPage,
  intoPortfolioCreatePage,
  intoPortfolioPage,
  intoItemPage,
} = viewSlice.actions;

export const selectUsers = (state: RootState) => state.user;

export default viewSlice.reducer;
