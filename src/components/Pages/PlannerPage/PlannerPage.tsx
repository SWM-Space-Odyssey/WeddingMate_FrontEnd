import { Button, Slide } from "@mui/material";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import PlannerInfo from "./subComponent/PlannerInfo";
import PlannerPortfolio from "./subComponent/PlannerPortfolio";
import BottomPostButton from "./subComponent/BottomPostButton";
import Header from "../../Header/Header";
import ProfileDialog from "../CreatePage/ProfileDialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../../../common/constants";
import { useParams } from "react-router-dom";
import LikeButton from "../../Modules/LikeButton";
import ContactForm from "../../Modules/contactForm";
import PlannerOptions from "../../Header/PlannerOptions";

type Props = {
  mypage?: boolean;
};

const PlannerPage = (props: Props) => {
  const MY_ACCESS_KEY = localStorage.getItem("accessToken");
  const view = useSelector((state: RootState) => state.view.currentView);
  const plannerId = parseInt(useParams().Id ?? "0");
  const requestURL = props.mypage
    ? `/api/v1/profile/planner`
    : `/api/v1/planner/${plannerId}`;
  const { data, isLoading } = useQuery(
    ["plannerInfo", plannerId],
    () =>
      axios.get(`${SERVER_URL}${requestURL}`, {
        headers: {
          Authorization: `Bearer ${MY_ACCESS_KEY}`,
        },
        withCredentials: true,
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  const response = data?.data.data;
  return (
    <>
      <div>
        <Header rightButton={props.mypage ? <PlannerOptions /> : undefined} />
      </div>
      <Slide
        className='overflow-y-scroll px-4 flex-1'
        direction={`${view === "Planner" ? "right" : "left"}`}
        in
        mountOnEnter
        unmountOnExit
      >
        <div className='w-full h-full px-4 flex flex-col '>
          <div className='sticky pb-5'>
            <PlannerInfo mypage={props.mypage} />
          </div>
          {/* <LikeButton
            isLiked={response?.isLiked}
            type='PLANNER'
            targetId={plannerId}
          /> */}
          <div className='overflow-y-scroll'>
            <PlannerPortfolio mypage={props.mypage} />
          </div>
          {props.mypage ? (
            <p className='absolute right-4 bottom-10 z-10'>
              <BottomPostButton />
            </p>
          ) : (
            <span className='absolute right-4 bottom-10 z-10'>
              <ContactForm />
            </span>
          )}
        </div>
      </Slide>
    </>
  );
};

export default PlannerPage;
