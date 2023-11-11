"use client";
import { AppContext } from "@/context/app-context";
import { RepositoryData } from "@/lib/types";
import { useContext } from "react";
import RepositoryListItem from "./RepositoryListItem";

export default function RepositoryList() {
  const { togglePopup, list } = useContext(AppContext);

  return (
    <ul className="flex flex-col gap-4 mt-6">
      {list &&
        list.map((item: RepositoryData, i: number) => (
          <RepositoryListItem key={i} item={item} />
        ))}
      {!list && (
        <>
          No results. <a onClick={togglePopup}>Start again</a>.
        </>
      )}
    </ul>
  );
}
