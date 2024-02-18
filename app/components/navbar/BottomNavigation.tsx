"use client";

import Container from "../Container";
import { IoDiamond } from "react-icons/io5";
import { BsBuildingFill, BsSnow } from "react-icons/bs";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCastle,
  GiCaveEntrance,
  GiDesert,
  GiDiamonds,
  GiFamilyHouse,
  GiForestCamp,
  GiHutsVillage,
  GiIsland,
  GiNightSky,
  GiSun,
  GiWindmill,
} from "react-icons/gi";
import { FaHome, FaSkiing } from "react-icons/fa";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import TypeBox from "../TypeBox";
export const categories = [
  {
    label: "Home",
    icon: FaHome,
    description: "This property is close to the Beach",
  },
  {
    label: "Rent",
    icon: BsBuildingFill,
    description: "This property has windmills",
  },
  {
    label: "Sale",
    icon: BsBuildingFill,
    description: "This property has windmills",
  },
  {
    label: "Lease",
    icon: GiFamilyHouse,
    description: "This property has windmills",
  },
];

const BottomNavigation = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  return (
    <Container>
      <div className="fixed bottom-0 left-0 w-full bg-white text-white p-2 flex justify-between items-center sm:hidden z-40">
        {categories.map((item) => (
          <TypeBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default BottomNavigation;
