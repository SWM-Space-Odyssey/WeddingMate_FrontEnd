import { Button, Slide } from "@mui/material";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import PlannerInfo from "./subComponent/PlannerInfo";
import PlannerPortfolio from "./subComponent/PlannerPortfolio";
import Header from "../../Header/Header";
import ProfileDialog from "../CreatePage/ProfileDialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../../../common/constants";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LikeButton from "../../Modules/LikeButton";
import ContactForm from "../../Modules/Custom/ContactForm";
import Divider from "../../Modules/Divider";
import CustomText from "../../Modules/Custom/CustomText";
import { Add, Edit } from "@mui/icons-material";
import { useUserInfo } from "../../../hooks/QueryHooks";
import EventModal from "./EventModal/EventModal";

type Props = {
  mypage?: boolean;
};

const PlannerPage = (props: Props) => {
  const MY_ACCESS_KEY = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const view = useSelector((state: RootState) => state.view.currentView);
  const guide = useSelector((state: RootState) => state.user.guide);
  const plannerId = parseInt(useParams().Id ?? "0");
  const location = useLocation().pathname.split("/")[1];
  console.log(location);
  return (
    <>
      {(!guide?.portfolio || !guide?.item) && <EventModal />}
      <Slide
        className='overflow-y-scroll px-4 flex-1'
        direction={`${view === "Planner" ? "right" : "left"}`}
        in
        mountOnEnter
        unmountOnExit
      >
        <div className='w-full h-full px-4 flex flex-col '>
          <div className='sticky pb-3'>
            <PlannerInfo />
          </div>
          <Divider height={2} />
          <div className='flex justify-between py-2'>
            <span className='flex items-center'>
              {location === "mypage" ? "내 " : ""}웨딩 피드
            </span>
            {location === "mypage" && (
              <Button
                variant='outlined'
                onClick={() => navigate("/create/portfolio")}
              >
                <Edit fontSize='small' />글 쓰기
              </Button>
            )}
          </div>
          <div className='overflow-y-scroll'>
            <PlannerPortfolio mypage={props.mypage} />
          </div>
        </div>
      </Slide>
    </>
  );
};

export default PlannerPage;
