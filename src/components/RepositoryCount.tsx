"use client";
import { AppContext } from "@/context/app-context";
import { useContext } from "react";

export default function RepositoryCount() {
  const { username, togglePopup, list } = useContext(AppContext);

  return (
    <>
      {username && (
        <p className="pb-4">
          Displaying {list.length} repositories for user <b>{username}</b>
          {` `}
          <a onClick={togglePopup} className="text-xs align-[1px]">
            (change)
          </a>
        </p>
      )}
    </>
  );
}
