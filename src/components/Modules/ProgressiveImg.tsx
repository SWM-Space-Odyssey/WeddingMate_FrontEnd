import React, { useEffect, useState } from "react";
import {
  PROGRESSIVE_IMAGE_URL,
  SERVER_IMAGE_URL,
} from "../../common/constants";

type Props = {
  src: string;
  [x: string]: any;
  tailwind?: string;
};

const ProgressiveImg = ({ src, ...props }: Props) => {
  const placeholderSrc = PROGRESSIVE_IMAGE_URL + src + `?q=1`;
  const mainSrc = `${SERVER_IMAGE_URL}${src}`;

  const [imgSrc, setImgSrc] = useState(placeholderSrc || mainSrc);

  useEffect(() => {
    // 이미지를 업데이트 합니다.
    const img = new Image();
    img.src = mainSrc;
    img.onload = () => {
      setImgSrc(mainSrc);
    };
  }, [src]);

  const customClass =
    placeholderSrc && imgSrc === placeholderSrc ? "loadingImg" : "loadedImg";

  return (
    <img
      {...{ src: imgSrc, ...props }}
      loading='lazy'
      className={`image object-contain ${customClass} cursor-pointer ${props.tailwind} `}
    />
  );
};
export default ProgressiveImg;
