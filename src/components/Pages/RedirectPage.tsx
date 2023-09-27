import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const RedirectPage = (props: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
    // window.location.href = "https://www.weddingmate.co.kr/";
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

export default RedirectPage;
