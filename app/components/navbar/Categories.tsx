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
export const categories = [
  {
    label: "Villa",
    icon: MdOutlineVilla,
    description: "This property is close to the Beach",
  },
  {
    label: "Appartments",
    icon: BsBuildingFill,
    description: "This property has windmills",
  },
  {
    label: "Flats",
    icon: BsBuildingFill,
    description: "This property has windmills",
  },
  {
    label: "House",
    icon: GiFamilyHouse,
    description: "This property has windmills",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div
        className="
    pt-4
    flex
    flex-row
    items-center
    justify-between
    overflow-x-auto
    
    
    "
      >
        {categories.map((item) => (
          <CategoryBox
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

export default Categories;
