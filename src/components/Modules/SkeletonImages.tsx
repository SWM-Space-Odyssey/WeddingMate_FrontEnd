import { Skeleton } from "@mui/material";
import React from "react";
import Masonry from "react-masonry-css";

const SkeletonImages = () => {
  return (
    <Masonry
      breakpointCols={3}
      className='my-masonry-grid'
      columnClassName='my-masonry-grid_column'
    >
      <Skeleton className='mb-2' variant='rounded' height={180} />
      <Skeleton className='mb-2' variant='rounded' height={150} />
      <Skeleton className='mb-2' variant='rounded' height={120} />
      <Skeleton className='mb-2' variant='rounded' height={180} />
      <Skeleton className='mb-2' variant='rounded' height={150} />
      <Skeleton className='mb-2' variant='rounded' height={120} />
      <Skeleton className='mb-2' variant='rounded' height={180} />
      <Skeleton className='mb-2' variant='rounded' height={150} />
      <Skeleton className='mb-2' variant='rounded' height={120} />
      <Skeleton className='mb-2' variant='rounded' height={180} />
      <Skeleton className='mb-2' variant='rounded' height={150} />
      <Skeleton className='mb-2' variant='rounded' height={120} />
      <Skeleton className='mb-2' variant='rounded' height={180} />
      <Skeleton className='mb-2' variant='rounded' height={150} />
      <Skeleton className='mb-2' variant='rounded' height={120} />
      <Skeleton className='mb-2' variant='rounded' height={180} />
      <Skeleton className='mb-2' variant='rounded' height={150} />
      <Skeleton className='mb-2' variant='rounded' height={120} />
      <Skeleton className='mb-2' variant='rounded' height={180} />
      <Skeleton className='mb-2' variant='rounded' height={150} />
      <Skeleton className='mb-2' variant='rounded' height={120} />
      <Skeleton className='mb-2' variant='rounded' height={180} />
      <Skeleton className='mb-2' variant='rounded' height={150} />
      <Skeleton className='mb-2' variant='rounded' height={120} />
    </Masonry>
  );
};

export default SkeletonImages;
