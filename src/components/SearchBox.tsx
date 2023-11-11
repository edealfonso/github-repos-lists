"use client";
import { searchRepositories } from "@/api/github";
import { AppContext } from "@/context/app-context";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import ErrorMessage from "./common/ErrorMessage";

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
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const inputKeywords = useRef<HTMLInputElement>(null);

  // reset filters when username is changed
  useEffect(resetFilters, [username]);

  async function handleClear(event: FormEvent<HTMLInputElement>) {
    event.preventDefault();

    // show loader
    setIsLoading(true);

    // reset filters
    resetFilters();

    // perform another search without filters
    // and save results in context state
    const results: any = await searchRepositories(username);
    setList(results.items);

    // remove loader
    setIsLoading(false);
  }

  function resetFilters() {
    // reset keywords input
    if (inputKeywords.current) {
      inputKeywords.current.value = "";
    }
    setKeywords("");

    // reset languages selectors
    // we must do this in a quite complicated way for it to work and not give linting problems **(*NOTE4*)**
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

    // show loader
    setIsLoading(true);

    // get form data (keywords input) and save in context state
    const formData = new FormData(event.currentTarget);
    const keywords: string | any = formData.get("keywords");
    setKeywords(keywords);

    // fetch results and update context state or show error
    const results: any = await searchRepositories(
      username,
      keywords,
      languageList
    );
    if (results.items) {
      setList(results.items);
    } else {
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
            className="relative mb-12 p-3 rounded-sm max-w-2xl md:p-4"
            style={{
              backgroundColor: "var(--background-alt-color)",
              width: showFilters ? "100%" : "fit-content",
            }}
          >
            <form
              style={{ display: showFilters ? "block" : "none" }}
              onSubmit={handleSearch}
            >
              <label className="flex flex-col gap-1">
                Keywords
                <input type="text" name="keywords" ref={inputKeywords} />
              </label>
              <div className="flex flex-col gap-1 mt-6 sm:mt-4">
                <p>Languages</p>
                <LanguageSelector />
              </div>
              <div className="flex gap-2 justify-end mt-9 sm:mt-6">
                <input type="submit" value="Search" />
                <input type="reset" onClick={handleClear} value="Clear" />
              </div>
            </form>
            <a
              onClick={() => {
                setShowFilters((current) => !current);
              }}
              className={showFilters ? "active" : "inactive"}
            >
              {showFilters ? " Hide Filters" : " Show Filters"}
            </a>
          </div>
        </>
      )}
      {error && (
        <>
          There was an error in yout request.
          <br />
          <br />
          <ErrorMessage>{error.message}</ErrorMessage>
        </>
      )}
    </>
  );
}
