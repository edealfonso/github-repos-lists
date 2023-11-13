"use client";
import { AppContext } from "@/context/app-context";
import { useContext } from "react";
import Tag from "./common/Tag";
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
    hideForkedRepos,
  } = useContext(AppContext);

  async function handleLanguageClick(index: number) {
    // show loader
    setIsLoading(true);

    // update language list in context state
    // we must do this in a quite complicated way for it to work and not give linting problems **(*NOTE4*)**
    let newSelection: Language[] = languageList;
    newSelection[index] = {
      name: newSelection[index].name,
      active: !newSelection[index].active,
    };
    setLanguageList(newSelection);

    // update results
    const results: any = await searchRepositories({
      username,
      keywords,
      languageList: newSelection,
      hideForkedRepos,
    });

    // update language list
    // we assume the is no possible error in this step
    setList(results.items);

    // remove loader
    setIsLoading(false);
  }

  return (
    <ul className="flex flex-wrap gap-2 mt-1">
      {languageList &&
        languageList.map((language: Language, i: number) => {
          return (
            <li className="flex items-center gap-3" key={i}>
              <Tag
                index={i}
                onTagClick={() => {
                  handleLanguageClick(i);
                }}
              >
                {language.name}
              </Tag>
            </li>
          );
        })}
    </ul>
  );
}
