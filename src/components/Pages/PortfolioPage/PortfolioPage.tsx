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
import { MY_ACCESS_KEY, SERVER_URL } from "../../../common/constants";
type Props = {};

type tagResDtoList = {
  tagId: number;
  content: string;
  categoryContent: string;
};
type headerData = {
  id: string;
  title: string;
  itemResDtoList: cardData[];
  repImgUrl: string;
  tagResDtoList: tagResDtoList[];
};
type portfolioData = {
  typeTag: "portfolio";
  data: headerData;
};
type GetPortfolioResponse = portfolioData & {
  status: "SUCCESS" | "FAIL";
};
type cardData = {
  itemRecord: string;
  portfolioId: number;
  itemTagList: string[];
  categoryContent: string;
  pictures: string[];
  order: number;
  itemId: number;
  company: string;
  date: string;
};

const PortfolioPage = (props: Props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [headerData, setHeaderData] = useState<headerData>();
  const [ItemCard, setItemCard] = useState<cardData[]>();
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
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const renderData = data?.data as GetPortfolioResponse;
  // const headerData = {
  //   title: renderData?.data.title,
  //   tagList: renderData?.data.tagResDtoList,
  //   repImgUrl: renderData?.data.repImgUrl,
  // };
  useEffect(() => {
    fetchPortfolio();
  }, [itemId]);

  console.log(headerData, ItemCard);
  return (
    <Slide direction='left' in mountOnEnter unmountOnExit>
      <div className='absolute w-full px-4'>
        <Suspense fallback={<div>loading...</div>}>
          {headerData && ItemCard && (
            <>
              <div>
                <PortfolioHeader data={headerData} />
              </div>
              <div className='mt-12'>
                <Button
                  onClick={() => console.log(headerData)}
                  sx={{ height: "38px", width: "100%" }}
                  variant='outlined'
                >
                  아이템 추가하기
                </Button>
              </div>
              <div className='mt-3'>
                <PortfolioItemCard />
              </div>
            </>
          )}
        </Suspense>
      </div>
    </Slide>
  );
};

export default PortfolioPage;
