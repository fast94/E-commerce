import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import homeslider1 from "../../assets/slider-image-1.jpeg";
import homeslider2 from "../../assets/slider-image-2.jpeg";
import homeslider3 from "../../assets/slider-image-3.jpeg";
export default function HomeSwiper() {
  return (
    <>
      <Swiper
        loop={true}
        modules={[Pagination]}
        pagination={true}
        className="h-100 w-full"
      >
        <SwiperSlide>
          <img src={homeslider1} alt="" className="h-full w-full " />
        </SwiperSlide>
        <SwiperSlide>
          <img src={homeslider2} alt="" className="h-full w-full " />
        </SwiperSlide>
        <SwiperSlide>
          <img src={homeslider3} alt="" className="h-full  w-full" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
