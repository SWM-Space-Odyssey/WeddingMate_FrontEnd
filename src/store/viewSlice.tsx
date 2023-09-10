import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { useNavigate } from "react-router-dom";

type PageList =
  | "Regist"
  | "LandingPage"
  | "PortfolioCreate"
  | "Portfolio"
  | "Item"
  | "ItemCreate"
  | "Planner"
  | "Feed";

interface viewState {
  currentView: PageList;
  viewStack: PageList[];
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
      state.prevPage = state.page;
      state.page += 1;
    },
    PrevPage: (state) => {
      if (state.page !== 0) {
        state.prevPage = state.page;
        state.page -= 1;
        // state.prevPage -= 1;
        return;
      }

      const prevPage = state.viewStack.pop();
      if (prevPage) {
        state.currentView = prevPage;
      }
    },
    intoView: (
      state,
      action: PayloadAction<{ view: PageList; requestParam?: string | number }>
    ) => {
      state.viewStack.push(state.currentView);
      state.currentView = action.payload.view;
      state.requestParam = action.payload.requestParam ?? "";
    },
  },
});

export const { NextPage, PrevPage, intoView } = viewSlice.actions;

export const selectUsers = (state: RootState) => state.user;

export default viewSlice.reducer;
