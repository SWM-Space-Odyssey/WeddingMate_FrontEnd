import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { intoView } from "../../store/viewSlice";
import { setAccessToken } from "../../store/userSlice";
import { MY_ACCESS_KEY } from "../../common/constants";

type Props = {
  redirect?: boolean;
};

const LodingSpinner = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = new URLSearchParams(useLocation().search);
  const accessToken = location.get("accessToken") || MY_ACCESS_KEY;
  useEffect(() => {
    if (!accessToken) {
      alert("잘못된 접근입니다. - Spinner ");
      navigate("/");
      return;
    }
    dispatch(intoView({ view: "LandingPage" }));
    dispatch(setAccessToken(accessToken));
    if (props.redirect) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, []);

  return (
    <div className='absolute flex items-center justify-center w-full h-full'>
      <div className='absolute z-10'>Loading . . .</div>
      <div className='absolute ease-in-out animate-spin h-32 w-32 flex items-center justify-center'>
        <div className='absolute h-[128px] w-[128px] rounded-full  bg-pink-500' />
        <div className='absolute h-[124px] w-[124px] rounded-full bg-white' />
        <div className='absolute h-12 w-32 bg-white' />
      </div>
    </div>
  );
};

export default LodingSpinner;
