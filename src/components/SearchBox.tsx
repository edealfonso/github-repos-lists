"use client";
import { searchRepositories } from "@/api/github";
import { AppContext } from "@/context/app-context";
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import LanguageSelector from "./LanguageSelector";
import ErrorMessage from "./common/ErrorMessage";
import RepositoryCount from "./RepositoryCount";

import style from "./SearchBox.module.css";
import { Language, SearchData } from "@/lib/types";

export default function SearchBox() {
  const {
    username,
    setList,
    list,
    languageList,
    setLanguageList,
    keywords,
    setKeywords,
    hideForkedRepos,
    setHideForkedRepos,
    setIsLoading,
  } = useContext(AppContext);

  const [error, setError] = useState<any>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const inputKeywords = useRef<HTMLInputElement>(null);
  const checkboxFork = useRef<HTMLInputElement>(null);

  // reset filters on username change
  useEffect(() => {
    resetKeywords();
    resetForkedOption();
    resetLanguageSelection();
  }, [username]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // get form data (keywords input)
    const formData = new FormData(event.currentTarget);
    const input: string | any = formData.get("keywords");

    // save in context state
    setKeywords(input);

    // search + display results/error
    await searchAndUpdate({
      username,
      keywords: input,
      languageList,
      hideForkedRepos,
    });
  }

  async function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    // get new value of input
    const forked = event.target.checked;

    // save in context
    setHideForkedRepos(forked);

    // search + display results/error
    await searchAndUpdate({
      username,
      keywords,
      languageList,
      hideForkedRepos: forked,
    });
  }

  async function handleLanguageClick(newLanguageList: Language[]) {
    // save in context
    setLanguageList(newLanguageList);

    // search + display results/error
    await searchAndUpdate({
      username,
      keywords,
      languageList: newLanguageList,
      hideForkedRepos,
    });
  }

  async function handleClear(event: FormEvent<HTMLInputElement>) {
    event.preventDefault();

    // reset filters
    resetKeywords();
    resetForkedOption();
    resetLanguageSelection();

    // search + display results / error
    searchAndUpdate({ username });
  }

  async function searchAndUpdate(data: SearchData) {
    // show loader
    setIsLoading(true);

    // API request
    const results: any = await searchRepositories(data);

    // show results / error
    if (results.items) {
      setList(results.items);
    } else {
      setError(results);
    }

    // remove loader
    setIsLoading(false);
  }

  function resetKeywords() {
    if (inputKeywords.current) {
      inputKeywords.current.value = "";
    }
    setKeywords("");
  }

  function resetForkedOption() {
    if (checkboxFork.current) {
      checkboxFork.current.checked = false;
    }
    setHideForkedRepos(false);
  }

  function resetLanguageSelection() {
    // we must do this in a quite complicated way for it to work and not give linting problems **(*NOTE4*)**
    let newLanguageList = languageList.map((language) => {
      return {
        name: language.name,
        active: false,
      };
    });
    setLanguageList(newLanguageList);
  }

  return (
    <>
      {username && list && (
        <>
          <div
            className="relative mb-12 p-3 rounded-sm max-w-2xl md:p-6"
            style={{
              backgroundColor: "var(--background-alt-color)",
            }}
          >
            <RepositoryCount />

            <form
              style={{ display: showFilters ? "block" : "none" }}
              onSubmit={handleSubmit}
            >
              <label className="flex flex-col gap-1">
                Keywords
                <input type="text" name="keywords" ref={inputKeywords} />
              </label>
              <div className="flex flex-col gap-1 mt-6 sm:mt-4">
                <p>Languages</p>
                <LanguageSelector onLanguageClick={handleLanguageClick} />
              </div>
              <label className="flex flex-col gap-1 mt-6 sm:mt-4">
                <p>Hide forked?</p>
                <div className={style.switch}>
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    ref={checkboxFork}
                    checked={hideForkedRepos == true ? true : false}
                  />
                  <span className={style.slider}></span>
                </div>
              </label>
              <div className="flex gap-2 justify-end mt-6 sm:mt-4">
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
