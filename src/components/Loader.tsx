"use client";

import { AppContext } from "@/context/app-context";
import { useContext } from "react";
import style from "./Loader.module.css";
export default function Loader() {
  const { isLoading } = useContext(AppContext);

  return (
    <>
      {isLoading && (
        <div className="z-20 fixed inset-0 flex items-center justify-center backdrop-brightness-90 bg-white/50 text-center p-8 ">
          <div className={style.loader}></div>
        </div>
      )}
    </>
  );
}
