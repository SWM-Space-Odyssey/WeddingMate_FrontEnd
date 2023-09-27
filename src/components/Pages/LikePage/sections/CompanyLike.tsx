import React, { useState } from "react";
import { SERVER_IMAGE_URL } from "../../../../common/constants";
import CustomText from "../../../Modules/CustomText";
import LikeButton from "../../../Modules/LikeButton";
import ProgressiveImg from "../../../Modules/ProgressiveImg";
import { useQuery } from "@tanstack/react-query";
import { getLike } from "../../../../api/like";
import EmptyLike from "./EmptyLike";

type Props = {};

interface CompanyLikeElementProps {
  imageURL: string;
  title: string;
  location: string;
  id: number;
  index: number;
}
const companyLikeElement = ({
  imageURL,
  title,
  location,
  id,
  index,
}: CompanyLikeElementProps) => {
  if (title.length > 25) {
    title = title.slice(0, 25) + " ...";
  }
  return (
    <div className='flex p-3' key={`CompanyImg-${index}`}>
      <div className='w-10 mr-1'>
        <ProgressiveImg
          src={imageURL}
          alt='companyImage'
          tailwind='rounded-full h-10 w-10'
        />
      </div>
      <div className='flex flex-1 flex-col'>
        <CustomText type='Title' text={title} />
        <div className='text-xs leading-tight mb-1'>{location}</div>
      </div>
      {/* <LikeButton isLiked targetId={id} type='item' /> */}
    </div>
  );
};

const dummydata = [
  {
    id: 1,
    title: "너무 아름다우신 신부님,,, 🤤🖤\n러블리하고 화려한 디테일들,,,🫰🏻",
    repImgUrl: "portfolio/1/드레스/20230904-083101.jpg",
  },
  {
    id: 4,
    title: "고즈넉한 한옥에서의 커플 사진 🫶",
    repImgUrl: "portfolio/1/스튜디오/20230904-0838680.jpg",
  },
  {
    id: 5,
    title: "너무 좋은 날씨의 야외 스냅 👰‍♀️",
    repImgUrl: "portfolio/1/스튜디오/20230904-0846240.jpg",
  },
  {
    id: 11,
    title: "수정수정수정",
    repImgUrl: "portfolio/13/드레스/20230925-1433692.jpg",
  },
];
type spreadElementsProps = {
  id: number;
  title: string;
  repImgUrl: string;
}[];
const CompanyLike = (props: Props) => {
  const { data } = useQuery(["companyLike"], () => getLike("company"));

  const spreadElements = (data: spreadElementsProps) => {
    return data.map((element, index) => {
      return companyLikeElement({
        imageURL: element.repImgUrl,
        title: element.title,
        location: "서울",
        id: element.id,
        index: index,
      });
    });
  };
  if (data && data.data?.length > 0) {
    return (
      <div className='flex-1 flex-col'>
        <a href='/'>{spreadElements(data.data)}</a>
      </div>
    );
  } else {
    return <EmptyLike />;
  }
};

export default CompanyLike;
