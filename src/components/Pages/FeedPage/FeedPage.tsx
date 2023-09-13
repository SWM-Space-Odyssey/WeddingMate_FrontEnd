import { Button, Fade, Modal, Slide } from "@mui/material";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import MasonryImage from "../../Modules/MasonryImage";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SkeletonImages from "../../Modules/SkeletonImages";
import CustomSearchForm from "../../Modules/CustomSearchForm";
import Header from "../../Header/Header";
import CustomText from "../../Modules/CustomText";
import kakaoLogin from "../../../assets/kakaoLogin.png";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import * as amplitude from "@amplitude/analytics-browser";
import { SERVER_URL } from "../../../common/constants";
type Props = {
  guide?: boolean;
};

type loremPicsum = {
  author: string;
  download_url: string;
  height: number;
  id: string;
  url: string;
  width: number;
};
const madalStyle = "flex flex-col justify-center items-center ";

const FeedPage = (props: Props) => {
  const user = useSelector((state: RootState) => state.view.currentView);
  const navigate = useNavigate();
  // useQuery 작성
  const [loginMadal, setLoginMadal] = useState(props.guide ? true : false);
  if (props.guide) {
    amplitude.track("Journey Start");
  }
  const myPageButton = (
    <button onClick={() => navigate("/plannermypage")}>
      <AccountCircle fontSize='large' sx={{ color: "white" }} />
    </button>
  );
  return (
    <>
      <Modal open={loginMadal} className={madalStyle}>
        <div
          className={
            madalStyle + "shadow-sm h-48 w-64 bg-zinc-100 rounded-3xl mb-20"
          }
        >
          <div className='text-lg'>서비스 이용을 위해</div>
          <div className='text-lg'>로그인이 필요합니다</div>
          <Button
            className='bg-[#FEE500] text-[#000000 85%] w-4/6 mt-4 rounded-md'
            href={`${SERVER_URL}/oauth2/authorization/kakao`}
          >
            <img src={kakaoLogin} className='w-full h-full' />
          </Button>
        </div>
      </Modal>
      <div>
        <Header main='main' rightButton={myPageButton} />
      </div>
      <Fade
        // direction='right'
        in
        mountOnEnter
        unmountOnExit
        className='overflow-y-scroll px-4 flex-1 flex flex-col'
      >
        <div>
          <CustomSearchForm />
          <MasonryImage />
        </div>
      </Fade>
    </>
  );
};

export default FeedPage;
