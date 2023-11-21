import { Card } from "@mui/material";
import React from "react";

type Props = {
  data: {
    content: string;
    date: string;
    writer?: {
      name: string;
      profileImgUrl: string;
    };
  };
};

const ImageCard = (props: Props) => {
  const { content, date, writer } = props.data;
  return (
    <div className='flex p-3 rounded gap-2 shadow-[4px_4px_6px_rgba(0,0,0,0.1)]'>
      {/* 이미지박스 */}
      <div className='h-[88px] w-[88px] bg-cyan-500' />
      <div className='flex flex-col flex-1'>
        <div className='flex items-center'>
          {/* 프로필이미지 */}
          <div className='w-5 h-5 rounded-xl bg-red-400' />
          <span>{writer ? writer.name : ""}</span>
        </div>

        <p className='flex-1 text-xs text-[#666666]'>{content}</p>
        <div>{date}</div>
      </div>
    </div>
  );
};

export default ImageCard;
