import { Card } from "@mui/material";
import React from "react";
import { PROGRESSIVE_IMAGE_URL } from "../../../../common/constants";
import { useUserInfo } from "../../../../hooks/QueryHooks";

type Props = {
  review: {
    itemRecord: string;
    itemDate: string;
    userId: number;
    repImgUrl: string;
  };
};

const ReviewCard = (props: Props) => {
  const { itemRecord: content, itemDate, userId, repImgUrl } = props.review;
  const { status, data } = useUserInfo(userId);
  return (
    <div className='flex p-3 rounded gap-2 shadow-[4px_4px_6px_rgba(0,0,0,0.1)]'>
      {/* 이미지박스 */}
      <div className='h-[88px] w-[88px] bg-cyan-500 rounded-md'>
        <img
          src={PROGRESSIVE_IMAGE_URL + repImgUrl + "?w=88&h=88"}
          alt=''
          className='h-full w-full object-cover rounded-lg'
        />
      </div>
      <div className='flex flex-col flex-1'>
        <div className='flex items-center gap-1'>
          {/* 프로필이미지 */}
          <div className='w-5 h-5 rounded-xl'>
            <img
              src={
                PROGRESSIVE_IMAGE_URL + data.data.profileImageUrl + "?w=20&h=20"
              }
              alt=''
              className='w-full h-full rounded-xl object-cover'
            />
          </div>
          <span>{data.data.nickname ?? ""}</span>
        </div>

        <p className='flex-1 text-xs text-[#666666]'>{content}</p>
        <div className='text-xs text-gray-500'>{itemDate}</div>
      </div>
    </div>
  );
};

export default ReviewCard;
