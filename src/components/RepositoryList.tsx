"use client";
import { AppContext } from "@/context/app-context";
import { RepositoryData } from "@/lib/types";
import { useContext } from "react";
import LanguageTag from "./LanguageTag";

export default function RepositoryList() {
  const { username, toggleForm, list } = useContext(AppContext);

  return (
    <>
      {username && (
        <p className="pb-4">
          Displaying {list.length} repositories for user <b>{username}</b>
          {` `}
          <a onClick={toggleForm} className="text-xs">
            (change)
          </a>
        </p>
      )}
      <ul className="flex flex-col gap-4 mt-6">
        {list &&
          list.map((item: RepositoryData, i: number) => (
            <li className="flex items-center gap-3" key={i}>
              <a className="no-underline" href={item.html_url} target="_blank">
                {item.name}{" "}
              </a>
              {item.language && <LanguageTag>{item.language}</LanguageTag>}
            </li>
          ))}
        {!list && (
          <>
            No results. <a onClick={toggleForm}>Start again</a>.
          </>
        )}
      </ul>
    </>
  );
}
