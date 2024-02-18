"use client";

import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

import Avatar from "../Avatar";
import Button from "../Button";
import { useState } from "react";

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  location: string;
  builtUpArea: number;
  carpetArea: number;
  totalFloor: number;
  roomCount: number;
  bathroomCount: number;
  bachelorsAllowed: string;
  carParking: string;
  disabled?: boolean;
  category?: string;
  price?: number;
  negoitable?: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  location,
  builtUpArea,
  carpetArea,
  totalFloor,
  roomCount,
  bathroomCount,
  description,
  bachelorsAllowed,
  carParking,
  negoitable,
  category,
  price,

  disabled,
}) => {
  const router = useRouter();
  const [buttonClicked, setButtonClicked] = useState(false);
  const handleClick = () => {
    router.push("tel:+919895718009");
    setButtonClicked(true);
  };
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl
            font-semibold
            flex
            flex-row
            items-center
            gap-2

            "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-col gap-2 border-2 p-5  rounded-xl">
          <div className="flex flex-row items-center font-semibold text-xl justify-between">
            <div className="text-xl font-semibold">Location</div>

            <div>{location}</div>
          </div>
          <hr />

          <div className="flex flex-row items-center justify-between font-semibold text-xl">
            <div className="text-xl font-semibold">Carpet Area</div>

            <div>{carpetArea} sqft</div>
          </div>
          <hr />
          <div className="flex flex-row justify-between font-semibold text-xl">
            <div className="text-xl font-semibold"> Built Up Area</div>

            <div>{builtUpArea} sqft</div>
          </div>
          <hr />
          <div className="flex flex-row justify-between font-semibold text-xl">
            <div className="text-xl font-semibold"> Bedrooms</div>

            <div>{roomCount} Bedrooms</div>
          </div>
          <hr />
          <div className="flex flex-row justify-between font-semibold text-xl grid-flow-row">
            <div className="text-xl font-semibold"> Bathrooms</div>

            <div>{bathroomCount} Bathroom</div>
          </div>
          <hr />
          <div className="flex flex-row justify-between font-semibold text-xl grid-flow-row">
            <div className="text-xl font-semibold"> Floors</div>

            <div>{totalFloor} Floors</div>
          </div>
          <hr />
          <div className="flex flex-row justify-between font-semibold text-xl">
            <div className="text-xl font-semibold"> Bachelors Allowed</div>
            <div>{bachelorsAllowed} </div>
          </div>
          <hr />
          <div className="flex flex-row justify-between font-semibold text-xl">
            <div className="text-xl font-semibold"> Car Parking</div>
            <div>{carParking} </div>
          </div>
          <hr />
          <div className="flex flex-row justify-between font-semibold text-xl">
            <div className="text-xl font-semibold"> Negoitable</div>
            <div>{negoitable} </div>
          </div>
          <hr />

          <div className="flex flex-row justify-between font-semibold text-xl">
            <div className="text-xl font-semibold"> Category</div>
            <div>{category} </div>
          </div>
          <hr />

          <div
            className="
    bg-white
    rounded-xl
    border-[1px]
    border-neutral-200
    overflow-hidden
    "
          >
            <div className="text-lg font-light text-neutral-500 p-4 ">
              {description}
            </div>
          </div>
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
        flex flex-col items-center gap-1 py-4 justify-between"
            >
              <div className="text-2xl font-semibold">
                <span className="font-light text-neutral-600">Price </span> ₹
                {price}
                <span className="font-light text-neutral-600"></span>
              </div>
            </div>

            <hr />
          </div>
        </div>
      </div>
      <div className="pb-10">
        <a href="tel:+919895718009">
          <Button
            label="Call Now"
            disabled={buttonClicked}
            onClick={() => {}}
          />
        </a>
      </div>
    </div>
  );
};

export default ListingInfo;
