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
import CustomSearchForm from "../../Modules/Custom/CustomSearchForm";
import Header from "../../Header/Header";
import CustomText from "../../Modules/Custom/CustomText";
import kakaoLogin from "../../../assets/kakaoLogin.png";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import * as amplitude from "@amplitude/analytics-browser";
import { SERVER_URL } from "../../../common/constants";
import Blocker from "../../Blocker/Blocker";
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
const modalStyle = "flex flex-col justify-center items-center ";

const FeedPage = (props: Props) => {
  const user = useSelector((state: RootState) => state.view.currentView);
  const navigate = useNavigate();
  const [loginModal, setLoginModal] = useState(props.guide ? true : false);
  if (props.guide) {
    amplitude.track("Journey Start");
  }
  const handleLoginButton = () => {
    setLoginModal(false);
    setAccepted(true);
  };
  const handleAcceptButton = () => {
    setAccepted(false);
  };
  const handleCancelButton = () => {
    setLoginModal(true);
    setAccepted(false);
  };
  const [accepeted, setAccepted] = useState(false);
  return (
    <>
      <Modal open={accepeted} className={modalStyle}>
        <div className='flex flex-col justify-center shadow-sm h-56 w-72 bg-zinc-100 rounded-3xl mb-20'>
          <div className='flex justify-center flex-col items-center py-2'>
            <div className='text-base font-bold pb-1'>! 잠시만요 !</div>

            <div className='text-sm font-sans text-red-800 flex flex-col items-center'>
              <div>현재까지는 정확한 유저 타겟팅을 위해</div>
              <div>20-30대 유저만을 모집하고 있습니다</div>
              <br />
              <div>🙇타겟 연령대 이외 연령대는🙇</div>
              <div>서비스 가입이 제한되는 점 양해 바랍니다</div>
            </div>
          </div>
          <div className='flex justify-end gap-2 px-2'>
            <Button variant='outlined' onClick={() => handleCancelButton()}>
              취소
            </Button>
            <a className='flex justify-center'>
              <Button
                variant='contained'
                href={`${SERVER_URL}/oauth2/authorization/kakao`}
              >
                확인
              </Button>
            </a>
            {/* <Button variant='contained' onClick={() => handleAcceptButton()}>
              확인
            </Button> */}
          </div>
        </div>
      </Modal>
      <Modal open={loginModal} className={modalStyle}>
        <div
          className={
            modalStyle +
            "shadow-sm text-lg h-48 w-64 bg-zinc-100 rounded-3xl mb-20"
          }
        >
          <div>서비스 이용을 위해</div>
          <div>로그인이 필요합니다</div>
          <Button
            className='bg-[#FEE500] text-[#000000 85%] w-4/6 mt-4 rounded-md'
            onClick={() => handleLoginButton()}
          >
            <img src={kakaoLogin} className='w-full h-full' />
          </Button>
        </div>
      </Modal>
      <Fade
        in
        mountOnEnter
        unmountOnExit
        className='overflow-y-scroll px-4 flex-1 flex flex-col'
      >
        <div>
          <CustomSearchForm />
          <Blocker SpecificComponent={() => <MasonryImage />} />
        </div>
      </Fade>
    </>
  );
};

export default FeedPage;
