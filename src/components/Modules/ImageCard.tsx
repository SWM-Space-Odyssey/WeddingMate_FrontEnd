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
    <div className='flex'>
      <div className='h-[88px] w-[88px] bg-cyan-500' />
      <div className='flex flex-col flex-1'>
        <div className='flex items-center'>
          <div className='w-5 h-5 rounded-xl bg-red-400' />
          <span>{writer ? writer.name : ""}</span>
        </div>
        <div className='flex-1 text-xs text-[#666666]'>{content}</div>
        <div>{date}</div>
      </div>
    </div>
  );
};

export default ImageCard;
