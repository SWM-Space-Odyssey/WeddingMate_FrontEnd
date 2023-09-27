import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { useNavigate } from "react-router-dom";

interface viewState {
  currentView: PageList;
  viewStack: PageList[];
  requestParam: string | number;
  page: number;
  prevPage: number;
  isWriter: boolean;
  isLike: boolean;
  adjData: {
    portfolioId: number;
    itemId: number;
    order: number;
  };
}

const initialState: viewState = {
  currentView: "LandingPage",
  viewStack: [],
  requestParam: "",
  page: 0,
  prevPage: 0,
  isWriter: false,
  isLike: false,
  adjData: {
    portfolioId: 0,
    itemId: 0,
    order: 0,
  },
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
      }

      const prevPage = state.viewStack.pop();
      if (prevPage) {
        state.currentView = prevPage;
      }
    },
    setIsWriter: (state, action: PayloadAction<boolean>) => {
      state.isWriter = action.payload;
    },
    setIsLike: (state, action: PayloadAction<boolean>) => {
      state.isLike = action.payload;
    },
    setAdjData: (
      state,
      action: PayloadAction<{
        portfolioId: number;
        itemId: number;
        order: number;
      }>
    ) => {
      state.adjData = action.payload;
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

export const {
  NextPage,
  PrevPage,
  intoView,
  setIsWriter,
  setIsLike,
  setAdjData,
} = viewSlice.actions;

export const selectUsers = (state: RootState) => state.user;

export default viewSlice.reducer;
