"use client";
import { useContext } from "react";
import { AppContext } from "@/context/app-context";
import Image from "next/image";

export default function UserPopupClose() {
  const { togglePopup } = useContext(AppContext);

  return (
    <a
      className="absolute top-0 right-0 translate-x-5 -translate-y-5"
      onClick={togglePopup}
    >
      <Image
        className="p-1 bg-white rounded-full border-solid border-2 border-black"
        src="/images/icons/close.svg"
        width={40}
        height={40}
        alt="✕"
      />
    </a>
  );
}
