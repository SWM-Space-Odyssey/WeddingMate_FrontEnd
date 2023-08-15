import { Slide } from "@mui/material";
import React, { Suspense, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import MasonryImage from "./subComponent/MasonryImage";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SkeletonImages from "../../Modules/SkeletonImages";
import CustomSearchForm from "../../Modules/CustomSearchForm";
import Header from "../../Header/Header";

type Props = {};

type loremPicsum = {
  author: string;
  download_url: string;
  height: number;
  id: string;
  url: string;
  width: number;
};

const FeedPage = (props: Props) => {
  const user = useSelector((state: RootState) => state.view.currentView);
  const defaultOption = {
    root: null,
    threshold: 0.5,
    rootMargin: "0px",
  };
  // useQuery 작성

  return (
    <Slide direction='right' in mountOnEnter unmountOnExit className='px-4'>
      <div>
        <Header main='main' />
        <CustomSearchForm />
        <MasonryImage />
      </div>
    </Slide>
  );
};

export default FeedPage;
