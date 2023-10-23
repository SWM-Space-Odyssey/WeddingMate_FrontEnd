import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./LoadingSpinner.css";
import { setAccessToken } from "../../store/userSlice";
type Props = {
  redirect?: boolean;
};

const LoadingSpinner = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timeOut = useParams().timeout;
  const queryToken = new URLSearchParams(location.search).get("accessToken");
  useEffect(() => {
    if (props.redirect && queryToken) {
      dispatch(setAccessToken(queryToken));
    }
    if (props.redirect) {
      setTimeout(() => {
        navigate("/mypage");
      }, 2000);
    }
    if (timeOut) {
      setTimeout(() => {
        navigate("/mypage");
      }, parseInt(timeOut) * 1000);
    }
  }, []);

  return (
    <div className='loading items-center justify-center w-full h-full'>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='dot'></div>
    </div>
  );
};

export default LoadingSpinner;
