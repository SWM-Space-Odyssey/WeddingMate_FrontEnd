import axios from "axios";
import React, { useEffect, useState } from "react";
import { PROGRESSIVE_IMAGE_URL, SERVER_URL } from "../../common/constants";
import CustomText from "./Custom/CustomText";
import { ArrowRight, ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setReportTargetId } from "../../store/userSlice";

type Props = {
  portfolioId: string;
  type: "item" | "portfolio";
};

const plannerURL = SERVER_URL + "/api/v1/customer/";
const portfolioURL = SERVER_URL + "/api/v1/portfolio/";
const plannerLink = "/planner/";
const portfolioLink = "/portfolio/";

const loadingElement = (
  <div>
    <div className='animate-pulse flex items-center space-x-2'>
      <div className='rounded-full bg-gray-400 h-8 w-8'></div>
      <div className='flex-1 bg-gray-400 h-4 w-16 py-1 rounded'></div>
    </div>
  </div>
);

const InfoIndicator = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [plannerInfo, setPlannerInfo] = useState<[string, string, number]>();
  const [portfolioInfo, setPortfolioInfo] =
    useState<[string, string, number]>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const infoElement = (
    data: [string, string, number | string],
    type: "planner" | "portfolio"
  ) => {
    const [imageUrl, title, id] = data;
    const maxLength = 10;
    const nickname =
      title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
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
          src={PROGRESSIVE_IMAGE_URL + imageUrl + "?q=10"}
          alt='plannerImage'
          className='h-8 w-8 rounded-2xl'
        />
        <CustomText type='Content-small' text={nickname} />
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
    const plannerId = portfolioRes.data.data.userId;
    dispatch(setReportTargetId(plannerId));
    const plannerRes = await axios.get(plannerURL + plannerId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    if (plannerRes.status === 200 && plannerRes.data.status === "SUCCESS") {
      setPlannerInfo([
        plannerRes.data.data.profileImageUrl,
        plannerRes.data.data.nickname,
        plannerRes.data.data.userId,
      ]);
    }
    setLoading(false);
  };
  useEffect(() => {
    getInfo();
    return () => {};
  }, []);
  return (
    <div className='pb-2 px-4 mb-3 flex gap-3 items-center border-b sticky top-0'>
      {loading && loadingElement}
      {!loading && plannerInfo && infoElement(plannerInfo, "planner")}
      {props.type === "item" && portfolioInfo && (
        <>
          <ChevronRight /> {infoElement(portfolioInfo, "portfolio")}
        </>
      )}
    </div>
  );
};

export default InfoIndicator;
