import { Button, Slide } from "@mui/material";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import PlannerInfo from "./subComponent/PlannerInfo";
import PlannerPortfolio from "./subComponent/PlannerPortfolio";

type Props = {};

const PlannerPage = (props: Props) => {
  const view = useSelector((state: RootState) => state.view.currentView);
  return (
    <Slide
      direction={`${view === "Planner" ? "right" : "left"}`}
      in
      mountOnEnter
      unmountOnExit
    >
      <div className='w-full h-full px-4 flex flex-col '>
        <div className='sticky pb-5'>
          <PlannerInfo />
        </div>
        <div className='overflow-y-scroll'>
          <PlannerPortfolio />
        </div>
      </div>
    </Slide>
  );
};

export default PlannerPage;
