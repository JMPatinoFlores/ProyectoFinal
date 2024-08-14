"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IReviewResponse } from "@/interfaces";
import { getAllReviews } from "@/lib/server/fetchUsers";
import { FaStar } from "react-icons/fa";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState<IReviewResponse[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={0}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className="w-full max-w-full text-white p-4 m-8"
    >
      {reviews.map((review) => (
        <SwiperSlide
          key={review.id}
          className="flex justify-center items-center"
        >
          <div className="p-10 bg-white text-black rounded-lg w-full max-w-lg mx-auto">
            <div className="flex justify-between">
              <RiDoubleQuotesL color="black" />
              <RiDoubleQuotesR />
            </div>
            <div className="flex justify-center mb-2 space-x-1">
              {Array.from({ length: review.rating }, (_, i) => (
                <FaStar key={i} color="#FBC02D" />
              ))}
            </div>
            <p>{review?.comment}</p>
            <p className="text-center p-4">
              - {review?.customer?.name || "Anónimo"}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewSlider;
