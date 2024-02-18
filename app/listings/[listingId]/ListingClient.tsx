"use client";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";

import BottomNavigation from "@/app/components/navbar/BottomNavigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  initialGuestCount?: number; // Add initialGuestCount prop
  initialRoomCount?: number; // Add initialRoomCount prop
  initialBathroomCount?: number; // Add initialBathroomCount prop
  onCategoryChange?: string; // Add initialBathroomCount prop
}

interface ReservationData {
  currentUser: SafeUser | null;
  category?: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  totalPrice: number;
  startDate?: Date;
  endDate?: Date;
  listingId: string; // or whatever type your listingId is
}

const ListingClient: React.FC<ListingClientProps> = ({
  onCategoryChange,
  initialGuestCount,
  initialRoomCount,
  initialBathroomCount,
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);

  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [guestCount, setGuestCount] = useState<number>(initialGuestCount || 1);
  const [roomCount, setRoomCount] = useState<number>(initialBathroomCount || 1);
  const [bathroomCount, setBathroomCount] = useState<number>(
    initialBathroomCount || 1
  );
  const [category, setCategory] = useState(onCategoryChange);

  const handleGuestCountChange = (value: number) => {
    setGuestCount(value);
  };

  const handleRoomCountChange = (value: number) => {
    setRoomCount(value);
  };

  const handleBathroomCountChange = (value: number) => {
    setBathroomCount(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const onhandleButtonClick = () => {
    router.refresh();
  };

  const sendTelegramMessage = async (reservationData: ReservationData) => {
    const TELEGRAM_BOT_TOKEN = "6730508849:AAE1PXog30B4I_HP6YGiMrfZ1AF4xqLWHrk";
    const CHAT_ID = "1971295160";
    const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const message = `
                New Reservation:
                Name: ${reservationData.currentUser?.name}
                Email: ${reservationData.currentUser?.email}
                Category: ${reservationData.category}
                Guest Count: ${reservationData.guestCount}
                Room Count: ${reservationData.roomCount}
                Bathroom Count: ${reservationData.bathroomCount}
                Total Price: ${reservationData.totalPrice}
                Start Date: ${reservationData.startDate}
                End Date: ${reservationData.endDate}
                Listing ID: ${reservationData.listingId}
            `;

    try {
      await axios.post(apiUrl, {
        chat_id: CHAT_ID,
        text: message,
      });
    } catch (error) {
      console.error(
        "Error sending message to Telegram:",
        toast.error("Not Sent to Telegram")
      );
    }
  };

  return (
    <Container>
      <div
        className="
              max-w-screen-lg 
              mx-auto
            "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.location}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
                flex
                flex-col
                gap-8
                "
          >
            <ListingInfo
              user={listing.user}
              description={listing.description}
              roomCount={listing.roomCount}
              carpetArea={listing.carpetArea}
              totalFloor={listing.totalFloor}
              builtUpArea={listing.builtUpArea}
              location={listing.location}
              bathroomCount={listing.bathroomCount}
              bachelorsAllowed={listing.bachelorsAllowed}
              carParking={listing.carParking}
              price={listing.price}
              category={listing.category}
              negoitable={listing.negoitable}
            />
          </div>
        </div>

        <BottomNavigation />
      </div>
    </Container>
  );
};
export default ListingClient;
