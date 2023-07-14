import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ProductCard from "./ProductCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Carousel = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
                610: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                930: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1550: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
            }}
            style={{
                padding: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <SwiperSlide>
                <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
                <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
                <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
                <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
                <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
                <ProductCard />
            </SwiperSlide>
        </Swiper>
    );
};

export default Carousel;
