import { Box, ImageList, ImageListItem, Skeleton } from "@mui/material";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import Masonry from "react-masonry-css";

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

const useFetchUsers = () =>
  useInfiniteQuery(
    ["picsum"],
    ({ pageParam = 1 }) => {
      console.log(pageParam);
      return axios.get("https://picsum.photos/v2/list", {
        params: { page: pageParam, limit: 30 },
      });
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage ? lastPage.config.params.page + 1 : undefined,
    }
  );

const MasonaryImage = (props: Props) => {
  const { data, fetchNextPage } = useFetchUsers();

  const renderData = useMemo(
    () => (data ? data.pages.flatMap(({ data }) => data) : []),
    [data]
  );
  const realRender = useMemo(() => {
    return renderData.map((item, index) => {
      return (
        <img
          onClick={() => console.log(item, index)}
          src={item.download_url}
          alt={item.author}
          key={index}
          loading='lazy'
          className='pb-2'
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
    <div>
      <Masonry
        breakpointCols={3}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {realRender}
        <Skeleton className='mb-2' variant='rounded' height={180} />
        <Skeleton className='mb-2' variant='rounded' height={150} />
        <Skeleton className='mb-2' variant='rounded' height={120} />
        <Skeleton className='mb-2' variant='rounded' height={180} />
        <Skeleton ref={ref} className='mb-2' variant='rounded' height={150} />
        <Skeleton className='mb-2' variant='rounded' height={120} />
      </Masonry>
    </div>
  );
};

export default React.memo(MasonaryImage);
