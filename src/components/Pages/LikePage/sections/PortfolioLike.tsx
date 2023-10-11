import React, { useState } from "react";
import { SERVER_IMAGE_URL } from "../../../../common/constants";
import CustomText from "../../../Modules/Custom/CustomText";
import LikeButton from "../../../Modules/LikeButton";
import ProgressiveImg from "../../../Modules/ProgressiveImg";
import { useQuery } from "@tanstack/react-query";
import { getLike } from "../../../../api/like";
import EmptyLike from "./EmptyLike";

type Props = {};

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

interface CompanyLikeElementProps {
  imageURL: string;
  title: string;
  id: number;
  index: number;
}
const PortfolioLikeElement = ({
  imageURL,
  title,
  id,
  index,
}: CompanyLikeElementProps) => {
  return (
    <div
      className='flex flex-col flex-[1_1_45%] p-3'
      key={`CompanyImg-${index}`}
    >
      <a href={`/portfolio/${id}`}>
        <div>
          <ProgressiveImg
            src={imageURL}
            alt='PortfolioImage'
            tailwind='rounded'
          />
        </div>
        <div className='flex flex-1 flex-col'>
          <CustomText type='Content-small' text={title} />
        </div>
      </a>
    </div>
  );
};

const PortfolioLike = (props: Props) => {
  const { data } = useQuery(["portfolioLike"], () => getLike("portfolio"));

  const spreadPortfolioLike = (data: typeof dummydata) => {
    return data.map((element, index) => {
      return PortfolioLikeElement({
        imageURL: element.repImgUrl,
        title: element.title,
        id: element.id,
        index: index,
      });
    });
  };
  if (data && data.data?.length > 0) {
    if (data.data.length % 2 === 1) {
      return (
        <div className='flex flex-wrap'>
          {spreadPortfolioLike(data.data)}
          <div className='flex-[1_1_45%]'></div>
        </div>
      );
    } else {
      return (
        <div className='flex flex-wrap'>{spreadPortfolioLike(data.data)}</div>
      );
    }
  } else {
    return <EmptyLike />;
  }
};

export default PortfolioLike;
