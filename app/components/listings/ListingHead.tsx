"use client";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  // data:SafeListing;
  title: string;
  locationValue: string;
  imageSrc: string[];
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  return (
    <>
      <Heading title={title} subtitle={`${locationValue}`} />

      <div
        className="
   w-full
   h-[60vh]
   overflow-hidden
   rounded-xl
   relative

   "
      >
        <Swiper
          className="h-full w-full"
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {imageSrc.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <Image
                alt={`Listing ${index + 1}`}
                src={imageUrl}
                fill
                className="object-cover w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
        <div></div>
      </div>
    </>
  );
};

export default ListingHead;
