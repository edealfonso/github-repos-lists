"use client";
import { AppContext } from "@/context/app-context";
import { useContext } from "react";
import LanguageTag from "./LanguageTag";
import { Language } from "@/lib/types";
import { searchRepositories } from "@/api/github";

export default function LanguageSelector() {
  const { languageList, setLanguageList, username, setList, keywords } =
    useContext(AppContext);

  async function handleLanguageClick(i: number) {
    let newSelection: Language[] = languageList;
    newSelection[i] = {
      name: newSelection[i].name,
      active: !newSelection[i].active,
    };

    // update results
    const results: any = await searchRepositories(
      username,
      keywords,
      languageList
    );
    setList(results.items);

    // update language list
    setLanguageList(newSelection);
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {languageList &&
        languageList.map((language: Language, i: number) => {
          return (
            <li className="flex items-center gap-3" key={i}>
              <LanguageTag
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
