"use client";
import { Range } from "react-date-range";
import Calender from "../inputs/Calender";
import Button from "../Button";
import { SafeListing, SafeUser } from "@/app/types";
import Heading from "../Heading";
import Counter from "../inputs/Counter";
import { useEffect, useState } from "react";
import CategoryInput from "../inputs/CategoryInput";
import { categories } from "../navbar/Categories";
import CounterReservation from "../inputs/CounterReservation";
import { useRouter } from "next/navigation";
import { BiRupee } from "react-icons/bi";

interface ListingReservationProps {
  listing?: SafeListing;
  category?: String;
  dayPrice?: number;
  nightPrice?: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  initialGuestCount?: number; // Add initialGuestCount prop
  initialRoomCount?: number; // Add initialRoomCount prop
  initialBathroomCount?: number; // Add initialBathroomCount prop
  onGuestCountChange: (value: number) => void;
  onRoomCountChange: (value: number) => void;
  onBathroomCountChange: (value: number) => void;
  onCategoryChange: (category: string) => void;
  maxNightGuestCount: number;
  maxDayGuestCount: number;
  maxRoomCount: number;
  maxBathroomCount: number;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  category,
  nightPrice,
  dayPrice,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  initialGuestCount,
  initialBathroomCount,
  initialRoomCount,
  onGuestCountChange,
  onRoomCountChange,
  onBathroomCountChange,
  onCategoryChange,
  maxNightGuestCount,
  maxDayGuestCount,
  maxRoomCount,
  maxBathroomCount,
}) => {
  const [guestCount, setGuestCount] = useState<number>(initialGuestCount || 1);
  const [roomCount, setRoomCount] = useState<number>(initialRoomCount || 1);
  const [bathroomCount, setBathroomCount] = useState<number>(
    initialBathroomCount || 1
  );
  const [categ, setCateg] = useState(category);
  const [maxLimitCount, setMaxLimitCount] = useState<number>(
    maxNightGuestCount || maxDayGuestCount
  );

  const [dateRange1, setDateRange1] = useState<Range>(dateRange);

  const setCustomValue1 = (type: string, value: string) => {
    switch (type) {
      case "categ":
        setCateg(value);
        onCategoryChange(value);

        // Update maxLimitCount based on the selected category
        if (value === "NightCruise") {
          setMaxLimitCount(maxNightGuestCount || 1);
        } else if (value === "DayCruise") {
          setMaxLimitCount(maxDayGuestCount || 1);
        }
        break;
      default:
        break;
    }
  };
  const router = useRouter();

  const setCustomValue = (type: string, value: number) => {
    switch (type) {
      case "guestCount":
        setGuestCount(value);
        onGuestCountChange(value); // Trigger the callback
        break;
      case "roomCount":
        setRoomCount(value);
        onRoomCountChange(value); // Trigger the callback
        break;
      case "bathroomCount":
        setBathroomCount(value);
        onBathroomCountChange(value); // Trigger the callback
        break;

      default:
        break;
    }
  };

  const onhandleClick = () => {
    router.refresh();
  };

  return (
    <div
      className="
    bg-white
    rounded-xl
    border-[1px]
    border-neutral-200
    overflow-hidden
    "
    >
      <div
        className="
        flex flex-row items-center gap-1 p-4 justify-between"
      >
        <div className="text-2xl font-semibold">
          ${nightPrice}{" "}
          <span className="font-light text-neutral-600"> /Night </span>
        </div>

        <div className="text-2xl font-semibold">
          ${dayPrice}{" "}
          <span className="font-light text-neutral-600"> /Day </span>
        </div>
      </div>

      <hr />

      <div
        className="
         justify-between p-4"
      >
        <div
          onClick={onhandleClick}
          className="
          grid 
          grid-cols-2 
          md:grid-cols-2 
          gap-3
          overflow-y-auto
        "
        >
          {categories.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={(category) => setCustomValue1("categ", category)}
                selected={categ === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
      <hr />

      <Calender
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => {
          // Enforce single day selection
          if (value.selection) {
            value.selection.endDate = value.selection.startDate;
          }
          // Call the actual onChange handler
          onChangeDate(value.selection);
        }}
      />

      <hr />

      <div className="flex flex-col gap-8 p-4">
        <CounterReservation
          title="Number of guests"
          subtitle="How many guests"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
          maxValue={maxLimitCount}
        />

        <hr />
        <CounterReservation
          title="Number of rooms"
          subtitle="How many rooms you have"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
          maxValue={maxRoomCount}
        />
        <hr />
        <CounterReservation
          title="Number of Bathrooms"
          subtitle="How many Bathrooms"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
          maxValue={maxBathroomCount}
        />
      </div>

      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div
        className="
p-4
flex
flex-row
items-center
justify-between
font-semibold
text-lg
"
      >
        <div>Total</div>
        <div onClick={onhandleClick} className="flex flex-r">
          <BiRupee />
          {totalPrice}
        </div>
      </div>
    </div>
  );
};

export default ListingReservation;
