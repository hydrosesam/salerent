"use-client";
import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const location = params?.get("location");
  const type = params?.get("type");

  const category = params?.get("category");

  const locationLabel = useMemo(() => {
    if (location) {
      return `${location}`;
    }

    return "Location";
  }, [location]);

  const categoryLabel = useMemo(() => {
    if (category) {
      return `${category}`;
    }

    return "Category";
  }, [category]);

  const typeLabel = useMemo(() => {
    if (type) {
      return `${type}`;
    }

    return "Type";
  }, [type]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="
      border-[1px]
      w-full
      md:w-auto
      py-2
      rounded-full
      shadow-sm
      hover:shadow-md
      transition
      cursor-pointer
  "
    >
      <div
        className="
          flex
          flex-row
          items-center
          justify-between
          "
      >
        <div
          className="
              text-sm 
              font-semibold
            
              px-6"
        >
          {categoryLabel}
        </div>

        <div
          className="
              text-sm 
              font-semibold
              px-6
              hidden sm:block
              border-x-2
              "
        >
          {locationLabel}
        </div>

        <div
          className="
              text-sm
              pl-6
              pr-2
              text-gray-600
              flex
              flex-row
              items-center
              gap-3
            
              
              "
        >
          <div className="font-semibold hidden sm:block">{typeLabel}</div>
          <div
            className="
                  p-2
                  bg-red-500
                  rounded-full
                  text-white"
          >
            <BiSearch size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
