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
type Pagelst =
  | "Regist"
  | "LandingPage"
  | "PortfolioCreate"
  | "Portfolio"
  | "Item"
  | "ItemCreate"
  | "Planner";

interface viewState {
  currentView: Pagelst;
  viewStack: Pagelst[];
  requestParam: string | number;
  page: number;
  prevPage: number;
}

const initialState: viewState = {
  currentView: "LandingPage",
  viewStack: [],
  requestParam: "",
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
    intoView: (
      state,
      action: PayloadAction<{ view: Pagelst; requestParam?: string | number }>
    ) => {
      console.log("REDUX", action.payload);
      state.viewStack.push(state.currentView);
      state.currentView = action.payload.view;
      state.requestParam = action.payload.requestParam ?? "";
    },
    // i want to take 2 parameter in intoView function and second parameter is optional
    // intoView: (state, action: PayloadAction<string, string>) => {
    //   state.viewStack.push(state.currentView);
    //   state.currentView = action.payload;
    //   state.viewId = action.payload2;
    // },
  },
});

export const { NextPage, PrevPage, intoView } = viewSlice.actions;

export const selectUsers = (state: RootState) => state.user;

export default viewSlice.reducer;
