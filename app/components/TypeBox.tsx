"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";
import { useCallback } from "react";

interface TypeBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const TypeBox: React.FC<TypeBoxProps> = ({ icon: Icon, label, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (label === "Home") {
      router.push("/");
      return;
    }

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      type: label,
    };

    if (params?.get("type") === label) {
      delete updatedQuery.type;
    }
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);
  return (
    <div
      onClick={handleClick}
      className={`
    flex
    flex-col
    items-center
    justify-center
    gap-2
    p-1
    border-b-2
    hover:text-neutral-800
    transition 
    cursor-pointer
    ${selected ? "border-b-neutral-800" : "border-transparent"}
    ${selected ? "text-neutral-800" : "text-neutral-500"}
    `}
    >
      <Icon size={20} />
      <div className="font-small text-sm">{label}</div>
    </div>
  );
};

export default TypeBox;
