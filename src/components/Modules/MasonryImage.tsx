import { Box, ImageList, ImageListItem, Skeleton } from "@mui/material";
import { isError, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import * as amplitude from "@amplitude/analytics-browser";
import axios from "axios";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Masonry from "react-masonry-css";
import { SERVER_IMAGE_URL, SERVER_URL } from "../../common/constants";
import { getFeedImage, getSearchFeedImage } from "../../api/Item";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import ProgressiveImg from "./ProgressiveImg";
const MY_ACCESS_KEY = localStorage.getItem("accessToken");

type Props = {
  search?: string;
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
const useFetchUsers = (param?: string) => {
  return useInfiniteQuery(
    ["Feed", param, MY_ACCESS_KEY],
    ({ pageParam = 0 }) => {
      if (typeof param === "string") {
        const response = getSearchFeedImage(pageParam, param);
        return response;
      } else {
        const response = getFeedImage(pageParam);
        return response;
      }
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) =>
        param
          ? lastPage.data.last
            ? undefined
            : lastPage.data.pageable.pageNumber + 1
          : lastPage.data &&
            lastPage.data?.pageSize > 0 &&
            lastPage.status === "SUCCESS" &&
            lastPage.data.typeTag === "feed"
          ? lastPage.data.nextCursor
          : undefined,
    }
  );
};

const MasonryImage = (props: Props) => {
  const { data, isLoading, fetchNextPage, isError } = useFetchUsers(
    props?.search
  );
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const renderData = useMemo(() => {
    if (data?.pages[0].status === "FAIL") setError(true);
    if (isError) return [];
    if (error) return [];
    if (props.search) {
      return data
        ? data.pages.flatMap(({ data, status }) =>
            status === "SUCCESS" && data.typeTag === "search"
              ? data.content
              : undefined
          )
        : [];
    }
    return data
      ? data.pages.flatMap(({ data, status }) =>
          status === "SUCCESS" && data.typeTag === "feed"
            ? data.imageListResDtoList
            : undefined
        )
      : [];
  }, [data]);

  const realRender = useMemo(() => {
    if (!renderData) return <div>Error</div>;
    return renderData.map((item, index) => {
      let imageNav = "";
      if (!item) return;
      if (item.itemId === null) {
        imageNav = `/portfolio/${item.fileId}`;
      } else {
        imageNav = `/item/${item.itemId}`;
      }

      if (!item) return;
      return (
        <ProgressiveImg
          onClick={() => navigate(imageNav)}
          src={item.url}
          alt={"weddingImage"}
          key={index}
          loading='lazy'
          tailwind='mb-2 rounded-lg'
        />
      );
    });
  }, [renderData, props.search]);

  const ref = useIntersect(async (entry, observer) => {
    if (entry.isIntersecting) {
      await fetchNextPage();
      observer.unobserve(entry.target);
    }
  });
  return (
    <div className='flex-1'>
      <Masonry
        breakpointCols={2}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {data && !isError && realRender}
        <div ref={ref} className='mb-2' />
      </Masonry>
      {isError && (
        <div className='h-3/4'>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default React.memo(MasonryImage);
