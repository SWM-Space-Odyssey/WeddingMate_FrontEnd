import React, { Suspense, useEffect, useRef, useState } from "react";
import PortfolioHeader from "./subComponents/PortfolioHeader";
import { Button, Slide } from "@mui/material";
import PortfolioItemCard from "./subComponents/PortfolioItemCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  // MY_ACCESS_KEY,
  SERVER_URL,
} from "../../../common/constants";
import Header from "../../Header/Header";
import { setAdjData, setIsLike, setIsWriter } from "../../../store/viewSlice";
import InfoIndicator from "../../Modules/InfoIndicator";
const MY_ACCESS_KEY = localStorage.getItem("accessToken");

type Props = {};

type tagResDtoList = {
  tagId: number;
  content: string;
  categoryContent: string;
};
type headerData = {
  id: number;
  title: string;
  itemResDtoList: cardData[];
  repImgUrl: string;
  tagList: string;
  region: string;
  isWriter: boolean;
  isLiked: boolean;
  userId: number;
};
type portfolioData = {
  typeTag: "portfolio";
  data: headerData;
};
type GetPortfolioResponse = portfolioData & {
  status: "SUCCESS" | "FAIL";
};

const PortfolioPage = (props: Props) => {
  const params = useParams();
  const portfolioId = useParams().itemId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [headerData, setHeaderData] = useState<headerData>();
  const [ItemCard, setItemCard] = useState<cardData[]>();
  const isWriter = useSelector((state: RootState) => state.view.isWriter);
  // const [isWriter, setIsWriter] = useState<boolean>(false);
  const itemId = params.itemId;
  const fetchPortfolio = () => {
    axios
      .get(`${SERVER_URL}/api/v1/portfolio/${itemId}`, {
        headers: { Authorization: `Bearer ${MY_ACCESS_KEY}` },
      })
      .then((res) => {
        const data = res.data as GetPortfolioResponse;
        if (data.status === "SUCCESS") {
          setHeaderData(data.data);
          setItemCard(data.data.itemResDtoList);
          const adjData = {
            portfolioId: data.data.id,
            itemId: 0,
            order: 0,
          };
          dispatch(setAdjData(adjData));
          if (data.data.isWriter) {
            dispatch(setIsWriter(data.data.isWriter));
          }
          if (data.data.isLiked) {
            dispatch(setIsLike(true));
          }
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPortfolio();
  }, [itemId]);

  return (
    <>
      {portfolioId && (
        <InfoIndicator portfolioId={portfolioId} type='portfolio' />
      )}
      <Slide
        className='overflow-y-scroll px-4  pb-4'
        direction='left'
        in
        mountOnEnter
        unmountOnExit
      >
        <div className='w-full px-4'>
          {headerData && ItemCard && (
            <>
              <div>
                <PortfolioHeader data={headerData} />
              </div>
              {isWriter && (
                <div className='mt-12'>
                  <Button
                    onClick={() =>
                      navigate(`/create/item/${itemId}/${ItemCard.length}`)
                    }
                    sx={{ height: "38px", width: "100%" }}
                    variant='outlined'
                  >
                    아이템 추가하기
                  </Button>
                </div>
              )}
              {!isWriter && (
                <div className='mt-12'>
                  <Button
                    onClick={() => navigate(`/planner/${headerData.userId}`)}
                    sx={{ height: "38px", width: "100%", color: "#fff" }}
                    variant='contained'
                  >
                    다른 포트폴리오 둘러보기
                  </Button>
                </div>
              )}
              <div className='my-3'>
                <PortfolioItemCard cardData={ItemCard} />
              </div>
            </>
          )}
        </div>
      </Slide>
    </>
  );
};

export default PortfolioPage;
