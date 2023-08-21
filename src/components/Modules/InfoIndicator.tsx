import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  PROGRESSIVE_IMAGE_URL,
  SERVER_IMAGE_URL,
  SERVER_URL,
} from "../../common/constants";
import { getPortfolio } from "../../api/portfolio";
import CustomText from "./CustomText";
import { ArrowRight, ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type Props = {
  portfolioId: string;
  type: "item" | "portfolio";
};

const plannerURL = SERVER_URL + "/api/v1/planner/";
const portfolioURL = SERVER_URL + "/api/v1/portfolio/";
const plannerLink = "/planner/";
const portfolioLink = "/portfolio/";

const InfoIndicator = (props: Props) => {
  const [plannerInfo, setPlannerInfo] = useState<[string, string, number]>();
  const [portfolioInfo, setPortfolioInfo] =
    useState<[string, string, number]>();
  const navigate = useNavigate();
  const infoElement = (
    data: [string, string, number | string],
    type: "planner" | "portfolio"
  ) => {
    const [imageUrl, nickname, id] = data;
    return (
      <div
        className='flex items-center gap-2 cursor-pointer'
        onClick={() => {
          if (type === "planner") {
            navigate(plannerLink + id);
          } else {
            navigate(portfolioLink + id);
          }
        }}
      >
        <img
          src={PROGRESSIVE_IMAGE_URL + imageUrl + "?q=1"}
          alt='plannerImage'
          className='h-8 w-8 rounded-2xl'
        />
        <CustomText type='Content-underlined' text={nickname} />
      </div>
    );
  };
  const getInfo = async () => {
    const portfolioRes = await axios.get(portfolioURL + props.portfolioId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    if (portfolioRes.status === 200 && portfolioRes.data.status === "SUCCESS") {
      setPortfolioInfo([
        portfolioRes.data.data.repImgUrl,
        portfolioRes.data.data.title,
        portfolioRes.data.data.id,
      ]);
    }
    const plannerId = portfolioRes.data.data.plannerId;
    const plannerRes = await axios.get(plannerURL + plannerId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    if (plannerRes.status === 200 && plannerRes.data.status === "SUCCESS") {
      setPlannerInfo([
        plannerRes.data.data.profileImageUrl,
        plannerRes.data.data.nickname,
        plannerRes.data.data.plannerProfileId,
      ]);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <div className='pb-1 mb-3 flex gap-3 items-center border-b'>
      {plannerInfo && infoElement(plannerInfo, "planner")}
      {props.type === "item" && portfolioInfo && (
        <>
          <ChevronRight /> {infoElement(portfolioInfo, "portfolio")}
        </>
      )}
    </div>
  );
};

export default InfoIndicator;
