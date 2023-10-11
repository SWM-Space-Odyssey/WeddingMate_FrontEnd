import React from "react";
import CustomText from "../../../Modules/CustomText";
import { useDispatch } from "react-redux";
import { intoView } from "../../../../store/viewSlice";
import axios from "axios";
import { getPortfolio, usePortfolioCheck } from "../../../../api/portfolio";
import { useQuery } from "@tanstack/react-query";
import { SERVER_IMAGE_URL } from "../../../../common/constants";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  mypage?: boolean;
};
const mockData = [
  {
    portfolioId: 1,
    title: "선남선녀",
    repImgUrl:
      "https://images.pexels.com/photos/2788488/pexels-photo-2788488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    portfolioId: 4,
    title: "선남선녀",
    repImgUrl:
      "https://images.pexels.com/photos/2814808/pexels-photo-2814808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    portfolioId: 5,
    title: "선남선녀",
    repImgUrl:
      "https://images.pexels.com/photos/3342697/pexels-photo-3342697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    portfolioId: 6,
    title: "생화 꽃다발 만원의행복 꽃다발💐 랜덤꽃 계절꽃다발",
    repImgUrl:
      "https://images.pexels.com/photos/1608590/pexels-photo-1608590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const PlannerPortfolio = (props: Props) => {
  const navigate = useNavigate();
  const portfolioId = parseInt(useParams().Id ?? "0");
  const { data } = usePortfolioCheck(portfolioId, props.mypage);
  if (data?.status === "FAIL" || data?.data.length === 0)
    return (
      <div className='flex flex-col items-center justify-center'>
        <span className='text-[5rem]'>🐾</span>
        <div>아직 작성된 글이 없습니다!</div>
        <div>글을 작성해보세요!</div>
      </div>
    );

  const portfolioList = data?.data.map((data) => (
    <button
      onClick={() => {
        navigate(`/portfolio/${data.portfolioId}`);
      }}
      key={data.portfolioId}
      className='h-56 flex flex-col gap-1.5'
    >
      <img
        src={SERVER_IMAGE_URL + data.repImgUrl}
        alt='Planner Portfolio Image'
        className='w-full max-h-44 flex-1 object-cover rounded-lg'
      />
      <CustomText text={data.title} type='Content-small' />
    </button>
  ));

  return (
    <div className='w-full h-full grid grid-cols-2 auto-rows-max gap-x-[6px] gap-y-6 items-center'>
      {portfolioList}
    </div>
  );
};

export default PlannerPortfolio;
