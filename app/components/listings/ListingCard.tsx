"use client";

// export default ListingCard
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { getUsernameByUserId } from "@/app/actions/getUserName";
import UseEditRentModal from "@/app/hooks/useEditRentModal";
import useLoginModal from "@/app/hooks/useLoginModal";
// Import Swiper styles
// import 'swiper/css';

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  secondaryActionLabel?: string;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  secondaryActionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const loginModal = useLoginModal();
  const useRentModal = UseEditRentModal();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const userName = useMemo(() => {
    if (!reservation) {
      return null;
    }

    return reservation?.user?.name;
  }, [reservation]);

  const roomCount = useMemo(() => {
    if (!reservation) {
      return null;
    }

    return reservation.roomCount;
  }, [reservation]);

  const guestCount = useMemo(() => {
    if (!reservation) {
      return null;
    }

    return reservation.guestCount;
  }, [reservation]);

  const bathroomCount = useMemo(() => {
    if (!reservation) {
      return null;
    }

    return reservation.bathroomCount;
  }, [reservation]);

  const userEmail = useMemo(() => {
    if (!reservation) {
      return null;
    }

    return reservation?.user?.email;
  }, [reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")} `;
  }, [reservation]);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    useRentModal.onOpen();
  }, [currentUser, loginModal, useRentModal]);

  return (
    <div
      className="col-span-1 shadow-xl border-2 rounded-xl cursor-pointer overflow-hidden"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-[4/3] h-full w-full relative overflow-hidden  shadow-xl">
          <Swiper
            className="h-full w-full"
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {data.imageSrc.map((imageUrl, index) => (
              <SwiperSlide key={index}>
                <Image
                  fill
                  alt={`Listing ${index + 1}`}
                  src={imageUrl}
                  className="object-cover group-hover:scale-110 transition"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* <div className="absolute top-3 right-3 z-10">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div> */}
        </div>
        <div className="flex flex-col gap-1 cursor-pointer group p-2">
          <div className="font-semibold text-2xl">₹ {data.price}</div>
          <div className="text-md truncate">{data.title}</div>
          <div className="font-light text-neutral-500 truncate">
            {data.location}
          </div>
          <div className="font-semibold text-neutral-500">{data.type}</div>
          <div className="font-light text-neutral-500">{userName}</div>
          <div className="font-light text-neutral-500">{userEmail}</div>
          {reservation && (
            <div className="flex flex-row justify-between">
              <div className="font-light text-neutral-500">Room Count</div>
              <div className="font-light text-neutral-500">{roomCount}</div>
            </div>
          )}

          {reservation && (
            <div className="flex flex-row justify-between">
              <div className="font-light text-neutral-500">No of Guest</div>
              <div className="font-light text-neutral-500">{guestCount}</div>
            </div>
          )}

          {reservation && (
            <div className="flex flex-row justify-between">
              <div className="font-light text-neutral-500">No of Bathrooms</div>
              <div className="font-light text-neutral-500">{roomCount}</div>
            </div>
          )}

          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}

          {onAction && secondaryActionLabel && (
            <Button
              disabled={disabled}
              small
              label={secondaryActionLabel}
              onClick={onRent}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
