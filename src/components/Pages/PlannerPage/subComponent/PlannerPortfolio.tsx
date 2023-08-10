import React from "react";
import CustomText from "../../../Modules/CustomText";
import { useDispatch } from "react-redux";
import { intoView } from "../../../../store/viewSlice";
import axios from "axios";
import { getOwnPortfolio } from "../../../../api/portfolio";

type Props = {};
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
  const dispatch = useDispatch();
  const response = getOwnPortfolio().then((response) => {
    if (response.status === "SUCCESS") {
      console.log(response.data);
    } else {
      console.log(response.data);
    }
  });
  console.log(response);
  const portfolioList = mockData.map((data) => (
    <button
      onClick={() =>
        dispatch(
          intoView({ view: "Portfolio", requestParam: data.portfolioId })
        )
      }
      key={data.portfolioId}
      className='h-56 flex flex-col gap-1.5'
    >
      <img
        src={data.repImgUrl}
        alt='Planner Portfolio Image'
        className='w-full max-h-44 object-cover rounded-sm'
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
