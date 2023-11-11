"use client";
import { useContext } from "react";
import { AppContext } from "@/context/app-context";
import Image from "next/image";

export default function UserPopupClose({
  onPopupClose,
}: {
  onPopupClose: () => void;
}) {
  const { togglePopup } = useContext(AppContext);

  function handleClick() {
    togglePopup();
    onPopupClose();
  }

  return (
    <a
      className="absolute top-0 right-0 translate-x-5 -translate-y-5"
      onClick={handleClick}
    >
      <Image
        className="p-1 bg-lightblue hover:bg-white dark:bg-blue dark:hover:bg-beige rounded-full border-solid border-2 border-black"
        src="/images/icons/close.svg"
        width={40}
        height={40}
        alt="✕"
      />
    </a>
  );
}
