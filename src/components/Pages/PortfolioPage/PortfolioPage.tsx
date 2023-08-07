import React, { useState } from "react";
import PortfolioHeader from "./subComponents/PortfolioHeader";
import { Button, Slide } from "@mui/material";
import ItemCreate from "../CreatePage/ItemCreate";
import PortfolioItemCard from "./subComponents/PortfolioItemCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { intoView } from "../../../store/viewSlice";

type Props = {};

const PortfolioPage = (props: Props) => {
  const dispatch = useDispatch();
  const view = useSelector((state: RootState) => state.view.currentView);
  return (
    <Slide
      direction='left'
      in={view === "Portfolio"}
      mountOnEnter
      unmountOnExit
    >
      <div className='absolute w-full px-4'>
        <div>
          <PortfolioHeader />
        </div>
        <div className='mt-12'>
          <Button
            onClick={() => dispatch(intoView({ view: "ItemCreate" }))}
            sx={{ height: "38px", width: "100%" }}
            variant='outlined'
          >
            아이템 추가하기
          </Button>
        </div>
        <div className='mt-3'>
          <PortfolioItemCard />
        </div>
      </div>
    </Slide>
  );
};

export default PortfolioPage;
