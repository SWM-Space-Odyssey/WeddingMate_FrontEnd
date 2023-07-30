import { Button, Slide } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import PortfolioHeader from "../PortfolioPage/subComponents/PortfolioHeader";
import CustomText from "../../Modules/CustomText";
import CustomTag from "../../Modules/CustomTag";
import CustomTagBlock from "../../Modules/CustomTagBlock";
import PlannerInfo from "./subComponent/PlannerInfo";
import PlannerPortfolio from "./subComponent/PlannerPortfolio";

type Props = {};

const PlannerPage = (props: Props) => {
  const view = useSelector((state: RootState) => state.view.currentView);
  return (
    <Slide
      direction={`${view === "Planner" ? "right" : "left"}`}
      in={view === "Planner"}
      mountOnEnter
      unmountOnExit
    >
      <div className='absolute w-full h-full px-4 flex flex-col gap-5'>
        <PlannerInfo />
        <PlannerPortfolio />
      </div>
    </Slide>
  );
};

export default PlannerPage;
