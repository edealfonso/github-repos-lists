"use client";
import { AppContext } from "@/context/app-context";
import { useContext } from "react";
import LanguageTag from "./LanguageTag";
import { Language } from "@/lib/types";
import { searchRepositories } from "@/api/github";

export default function LanguageSelector() {
  const {
    setIsLoading,
    languageList,
    setLanguageList,
    username,
    setList,
    keywords,
  } = useContext(AppContext);

  async function handleLanguageClick(index: number) {
    console.log("handleLanguageClick");
    let newSelection: Language[] = languageList;
    newSelection[index] = {
      name: newSelection[index].name,
      active: !newSelection[index].active,
    };

    // show loader
    setIsLoading(true);

    // update results
    const results: any = await searchRepositories(
      username,
      keywords,
      languageList
    );
    setList(results.items);

    // update language list
    setLanguageList(newSelection);

    // remove loader
    setIsLoading(false);
  }

  return (
    <ul className="flex flex-wrap gap-2 mt-1">
      {languageList &&
        languageList.map((language: Language, i: number) => {
          return (
            <li className="flex items-center gap-3" key={i}>
              <LanguageTag
                index={i}
                onButtonClick={() => {
                  handleLanguageClick(i);
                }}
              >
                {language.name}
              </LanguageTag>
            </li>
          );
        })}
    </ul>
  );
}
