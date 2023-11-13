"use client";

import { AppContext } from "@/context/app-context";
import { ReactNode, useContext } from "react";
import style from "./Loader.module.css";

interface Props {
  children?: ReactNode;
  local?: boolean;
}

export default function Loader({ children, local }: Props) {
  const { isLoading } = useContext(AppContext);

  return (
    <>
      {(isLoading || local) && (
        <div
          className={`${
            local
              ? "absolute inset-4 bg-beige dark:bg-gray rounded-sm flex-col gap-4"
              : "fixed inset-0 pb-4 backdrop-brightness-90 bg-white/50 dark:bg-black/30"
          } z-20  flex items-center justify-center  text-center`}
        >
          <div className={style.loader}></div>
          {children}
        </div>
      )}
    </>
  );
}
