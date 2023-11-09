"use client";
import { searchRepositories } from "@/api/github";
import { AppContext } from "@/context/app-context";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";

export default function SearchBox() {
  const {
    username,
    setList,
    list,
    languageList,
    setLanguageList,
    setKeywords,
    setIsLoading,
  } = useContext(AppContext);

  const [error, setError] = useState<any>("");

  const inputKeywords = useRef<HTMLInputElement>(null);

  useEffect(clearFilters, [username]);

  async function handleClear(event: FormEvent<HTMLInputElement>) {
    console.log("handleClear");

    event.preventDefault();
    clearFilters();

    // show loader
    setIsLoading(true);

    const results: any = await searchRepositories(username);
    setList(results.items);
    // remove loader
    setIsLoading(false);
  }
  function clearFilters() {
    if (inputKeywords.current) {
      inputKeywords.current.value = "";
    }
    setKeywords("");
    deactivateAllLanguages();
  }

  function deactivateAllLanguages() {
    let newLanguageList = languageList.map((language) => {
      return {
        name: language.name,
        active: false,
      };
    });
    setLanguageList(newLanguageList);
  }

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const keywords: string | any = formData.get("keywords");
    console.log("white");

    // show loader
    setIsLoading(true);

    // fetch results
    const results: any = await searchRepositories(
      username,
      keywords,
      languageList
    );
    if (results.items) {
      // update results
      setList(results.items);

      // update keyword
      setKeywords(keywords);
    } else {
      // show error
      setError(results);
    }

    // remove loader
    setIsLoading(false);
  }

  return (
    <>
      {username && list && (
        <>
          <div
            className="mb-12 p-2 rounded-sm max-w-2xl md:p-4"
            style={{ backgroundColor: "var(--background-alt-color)" }}
          >
            <form onSubmit={handleSearch}>
              <label className="flex flex-col gap-1">
                Keywords
                <input type="text" name="keywords" ref={inputKeywords} />
              </label>
              <div className="flex flex-col gap-1 mt-4">
                <p>Languages</p>
                <LanguageSelector />
              </div>
              <div className="flex gap-2 justify-end">
                <input className="mt-4" type="submit" value="Search" />
                <input
                  className="mt-4"
                  type="reset"
                  onClick={handleClear}
                  value="Clear"
                />
              </div>
            </form>
          </div>
        </>
      )}
      {error && (
        <>
          There was an error in yout request.
          <br />
          <br />
          <small>{error.message}</small>
        </>
      )}
    </>
  );
}
