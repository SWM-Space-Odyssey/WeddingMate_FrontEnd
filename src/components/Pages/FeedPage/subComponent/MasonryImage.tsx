import { Box, ImageList, ImageListItem, Skeleton } from "@mui/material";
import { isError, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Masonry from "react-masonry-css";
import {
  // MY_ACCESS_KEY,
  SERVER_IMAGE_URL,
  SERVER_URL,
} from "../../../../common/constants";
import { getFeedImage } from "../../../../api/Item";
import { useNavigate } from "react-router-dom";
import LodingSpinner from "../../../Modules/LodingSpinner";
const MY_ACCESS_KEY = localStorage.getItem("accessToken");

type Props = {};
type loremPicsum = {
  author: string;
  download_url: string;
  height: number;
  id: string;
  url: string;
  width: number;
};

type IntersectHandler = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver
) => void;

const useIntersect = (
  onIntersect: IntersectHandler,
  options?: IntersectionObserverInit
) => {
  const ref = useRef<HTMLDivElement>(null);
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options, callback]);

  return ref;
};
const useFetchUsers = (param?: string) =>
  useInfiniteQuery(
    ["picsum"],
    ({ pageParam = 0 }) => {
      return getFeedImage(pageParam, 6);
      // return axios.get(`${SERVER_URL}/api/v1/file`, {
      //   headers: {
      //     Authorization: `Bearer ${MY_ACCESS_KEY}`,
      //   },
      //   params: { page: pageParam, size: 6 },
      //   withCredentials: true,
      // });
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) =>
        // !lastPage.data.data.last ? lastPage.config.params.page + 1 : undefined,
        lastPage.status === "SUCCESS" &&
        lastPage.data.typeTag === "feed" &&
        !lastPage.data.last
          ? lastPage.data.pageable.pageNumber + 1
          : undefined,
    }
  );

const MasonryImage = (props: Props) => {
  const { data, isLoading, fetchNextPage } = useFetchUsers();
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const renderData = useMemo(() => {
    if (data?.pages[0].status === "FAIL") setIsError(true);
    // return data ? data.pages.flatMap(({ data }) => data.data.content) : [];
    return data
      ? data.pages.flatMap(({ data, status }) =>
          status === "SUCCESS" && data.typeTag === "feed"
            ? data.content
            : undefined
        )
      : [];
  }, [data]);
  const realRender = useMemo(() => {
    return renderData.map((item, index) => {
      let imageNav = "";
      if (!item) return;
      if (item.itemId === null) {
        imageNav = `/portfolio/${item.portfolioId}`;
      } else {
        imageNav = `/item/${item.itemId}`;
      }

      if (!item) return;
      return (
        <img
          onClick={() => navigate(imageNav)}
          src={SERVER_IMAGE_URL + item.url}
          alt={String(item.url)}
          key={index}
          loading='lazy'
          className='pb-2 cursor-pointer'
        />
      );
    });
  }, [renderData]);
  const ref = useIntersect(async (entry, observer) => {
    if (entry.isIntersecting) {
      await fetchNextPage();
      observer.unobserve(entry.target);
    }
  });
  return (
    <div className='flex-1'>
      <Masonry
        breakpointCols={3}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {data && !isError && realRender}
        <div ref={ref} className='mb-2' />
      </Masonry>
      {isError && (
        <div className='h-3/4'>
          <LodingSpinner />
        </div>
      )}
    </div>
  );
};

export default React.memo(MasonryImage);
