import React, { Suspense, useEffect, useRef, useState } from "react";
import PortfolioHeader from "./subComponents/PortfolioHeader";
import { Button, Slide } from "@mui/material";
import ItemCreate from "../CreatePage/ItemCreate";
import PortfolioItemCard from "./subComponents/PortfolioItemCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { intoView } from "../../../store/viewSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getItem } from "../../../api/Item";
import { getPortfolio } from "../../../api/portfolio";
type Props = {};

const PortfolioPage = (props: Props) => {
  const dispatch = useDispatch();
  const view = useSelector((state: RootState) => state.view.currentView);
  const params = useParams();
  const navigate = useNavigate();
  const dataRef = useRef<any>(null);
  const itemId = params.itemId;
  let queryFlag = null;
  useEffect(() => {
    if (!itemId) {
      navigate("/");
      const data = getPortfolio(parseInt(itemId as string));
      dataRef.current = data;
    }
  }, [itemId]);

  // const { data, isLoading } = useQuery(
  //   ["portfolio"],
  //   async () => {
  //     console.log("hhh?");
  //     const response = await getPortfolio(parseInt(itemId as string));
  //     if (response) {
  //       dataRef.current = response.data;
  //       return response;
  //     }
  //   },
  //   {
  //     enabled: !!itemId,
  //     refetchOnWindowFocus: false,
  //   }
  // );
  console.log(dataRef);
  return (
    // <Slide
    //   direction='left'
    //   in={view === "Portfolio"}
    //   mountOnEnter
    //   unmountOnExit
    // >
    <div className='absolute w-full px-4'>
      <Suspense fallback={<div>loading...</div>}>
        {dataRef && (
          <>
            <div>
              <PortfolioHeader />
            </div>
            <div className='mt-12'>
              <Button
                onClick={() => console.log(dataRef)}
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
    // </Slide>
  );
};

export default PortfolioPage;
