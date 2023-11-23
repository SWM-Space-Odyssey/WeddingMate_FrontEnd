import { Button } from "@mui/material";
import React from "react";

type Props = {};

const EmptyLike = (props: Props) => {
  return (
    <div className='flex flex-col h-full justify-center items-center'>
      <span className='text-[8rem]'>🛒</span>
      <div className='pb-5'>아직 찜한 항목이 없어요!</div>
      <Button variant='contained'>
        <a href='/'>둘러보기</a>
      </Button>
    </div>
  );
};

export default EmptyLike;
