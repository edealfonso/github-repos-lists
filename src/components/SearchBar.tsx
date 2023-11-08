"use client";
import { searchRepositories } from "@/api/github";
import { AppContext } from "@/context/app-context";
import { RepositoryData } from "@/lib/types";
import { FormEvent, useContext } from "react";

export default function SearchBar() {
  const { toggleForm, username, setList, setKeywords } = useContext(AppContext);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const keywords: string | any = formData.get("keywords");

    if (keywords) {
      setKeywords(keywords);
      const results: any = await searchRepositories(username, keywords);
      // const results: any = await searchRepositories(username, "css", [
      //   "JavaScript",
      // ]);
      setList(results.items);
    }
  }

  return (
    <>
      {username && (
        <>
          <div
            className="mb-4 p-2 rounded-sm"
            style={{ backgroundColor: "var(--background-alt-color)" }}
          >
            <form onSubmit={handleSearch}>
              <label className="flex flex-col gap-1">
                Keywords:
                <input type="text" name="keywords" />
              </label>
              <input
                className="py-1 px-2 mt-2 rounded-sm"
                type="submit"
                value="Search"
                style={{ backgroundColor: "var(--button-color)" }}
              />
            </form>
          </div>
          <p>
            Displaying results of user <b>{username}</b>
            {` `}
            <a onClick={toggleForm} className="small">
              (change)
            </a>
          </p>
        </>
      )}
    </>
  );
}
