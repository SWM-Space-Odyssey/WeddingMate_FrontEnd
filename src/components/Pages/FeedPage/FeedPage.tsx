import { Slide } from "@mui/material";
import React, { Suspense, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import MasonaryImage from "./subComponent/MasonaryImage";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
  const view = useSelector((state: RootState) => state.view.currentView);
  const defaultOption = {
    root: null,
    threshold: 0.5,
    rootMargin: "0px",
  };
  // useQuery 작성

  return (
    <Slide
      direction={`${view === "Feed" ? "left" : "right"}`}
      in={view === "Feed"}
      mountOnEnter
      unmountOnExit
      className='flex-1 overflow-y-scroll px-4'
    >
      <div>
        <Suspense fallback>{<MasonaryImage />}</Suspense>
      </div>
    </Slide>
  );
};

export default FeedPage;
