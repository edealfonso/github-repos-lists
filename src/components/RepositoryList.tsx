"use client";
import { AppContext } from "@/context/app-context";
import { RepositoryData } from "@/lib/types";
import { useContext } from "react";

export default function RepositoryList() {
  const { list } = useContext(AppContext);

  return (
    <ul className="flex flex-col gap-3 mt-6">
      {list &&
        list.map((item: RepositoryData, i: number) => {
          return <li key={i}>{item.name}</li>;
        })}
    </ul>
  );
}
