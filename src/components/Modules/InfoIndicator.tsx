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
  plannerId?: number;
  portfolioId?: string | number;
};

const plannerURL = SERVER_URL + "/api/v1/planner/";
const portfolioURL = SERVER_URL + "/api/v1/portfolio/";
const plannerLink = "/planner/";
const portfolioLink = "/portfolio/";

const InfoIndicator = (props: Props) => {
  const [plannerInfo, setPlannerInfo] = useState<[string, string]>();
  const [portfolioInfo, setPortfolioInfo] = useState<[string, string]>();
  const navigate = useNavigate();
  const infoElement = (
    data: [string, string],
    type: "planner" | "portfolio"
  ) => {
    const [imageUrl, nickname] = data;
    return (
      <div
        className='flex items-center gap-2 cursor-pointer'
        onClick={() => {
          if (type === "planner") {
            navigate(plannerLink + props.plannerId);
          } else {
            navigate(portfolioLink + props.portfolioId);
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
    const plannerRes = await axios.get(plannerURL + props.plannerId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(plannerRes);
    if (plannerRes.status === 200 && plannerRes.data.status === "SUCCESS") {
      setPlannerInfo([
        plannerRes.data.data.profileImageUrl,
        plannerRes.data.data.nickname,
      ]);
    }
    if (props.portfolioId) {
      const portfolioRes = await axios.get(portfolioURL + props.portfolioId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (
        portfolioRes.status === 200 &&
        portfolioRes.data.status === "SUCCESS"
      ) {
        setPortfolioInfo([
          portfolioRes.data.data.repImgUrl,
          portfolioRes.data.data.title,
        ]);
      }
    }
  };
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <div className='pb-1 mb-3 flex gap-3 items-center border-b'>
      {plannerInfo && infoElement(plannerInfo, "planner")}
      {portfolioInfo && (
        <>
          <ChevronRight /> {infoElement(portfolioInfo, "portfolio")}
        </>
      )}
    </div>
  );
};

export default InfoIndicator;
