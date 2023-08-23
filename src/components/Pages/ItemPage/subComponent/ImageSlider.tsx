import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import { SERVER_IMAGE_URL } from "../../../../common/constants";

type Props = {
  images: string[];
};

const ImageSlider = (props: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();

  return (
    <div>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper2'
      >
        {props.images.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={SERVER_IMAGE_URL + image}
                className='w-full aspect-square object-cover'
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={6}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper mt-1.5'
      >
        {props.images.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={SERVER_IMAGE_URL + image}
                className='aspect-square object-cover'
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
