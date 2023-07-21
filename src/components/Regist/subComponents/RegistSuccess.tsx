import { Button } from "@mui/material";
import React from "react";

type Props = {};

const RegistSuccess = (props: Props) => {
  return (
    <div className='flex flex-col items-center mt-11'>
      <div className='mb-5 text-2xl'>가입되었어요!</div>
      <div className='mb-10 flex w-40 h-40 bg-slate-300 items-center justify-center'>
        IMAGE
      </div>
      <Button type='submit' sx={{ fontSize: "1rem" }} className='w-full'>
        웨딩 사진 보러가기
      </Button>
    </div>
  );
};

export default RegistSuccess;
