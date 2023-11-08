"use client";
import { searchRepositories } from "@/api/github";
import { AppContext } from "@/context/app-context";
import { RepositoryData } from "@/lib/types";
import { FormEvent, useContext, useEffect, useRef } from "react";

export default function SearchBar() {
  const { toggleForm, username, setList, list } = useContext(AppContext);
  const inputKeywords = useRef<HTMLInputElement>(null);
  const inputLanguages = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(typeof inputKeywords);
    if (inputKeywords.current) {
      inputKeywords.current.value = "";
    }
    if (inputLanguages.current) {
      inputLanguages.current.value = "";
    }
  }, [username]);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const keywords: string | any = formData.get("keywords");
    const language: string | any = formData.get("language");

    const results: any = await searchRepositories(
      username,
      keywords,
      language.split(",").map((item: string) => item.trim())
    );
    setList(results.items);
  }

  return (
    <>
      {username && list && (
        <>
          <div
            className="mb-4 p-2 rounded-sm"
            style={{ backgroundColor: "var(--background-alt-color)" }}
          >
            <form onSubmit={handleSearch}>
              <label className="flex flex-col gap-1">
                Keywords:
                <input type="text" name="keywords" ref={inputKeywords} />
              </label>
              <label className="flex flex-col gap-1 mt-4">
                Languages (separate by commas):
                <input type="text" name="language" ref={inputLanguages} />
              </label>
              <input
                className="py-1 px-2 mt-4 rounded-sm"
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
      {username && !list && (
        <>
          No repositories found for user <b>{username}</b>
          {` `}
          <a onClick={toggleForm} className="small">
            (change)
          </a>
        </>
      )}
    </>
  );
}
