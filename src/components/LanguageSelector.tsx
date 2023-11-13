import { AppContext } from "@/context/app-context";
import { useContext } from "react";
import Tag from "./common/Tag";
import { Language } from "@/lib/types";

export default function LanguageSelector({
  onLanguageClick,
}: {
  onLanguageClick: (newLanguageList: Language[]) => void;
}) {
  const { languageList } = useContext(AppContext);

  async function handleTagClick(index: number) {
    // update language list in context state
    // we must do this in a quite complicated way for it to work and not give linting problems **(*NOTE4*)**
    let newSelection: Language[] = languageList;
    newSelection[index] = {
      name: newSelection[index].name,
      active: !newSelection[index].active,
    };

    // emit event to SearchBox component
    onLanguageClick(newSelection);
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
                  handleTagClick(i);
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
