"use client";
import { Language, RepositoryData } from "@/lib/types";
import { createContext, ReactNode, useState } from "react";

type appContextType = {
  username: string;
  setUsername: (username: string) => void;
  keywords: string;
  setKeywords: (username: string) => void;
  showForm: boolean;
  toggleForm: () => void;
  list: RepositoryData[] | any;
  setList: RepositoryData[] | any;
  languageList: Language[];
  setLanguageList: (languages: Language[]) => void;
  // languageSelection: boolean[];
  // setLanguageSelection: (active: boolean[]) => void;
};

const appContextDefaultValues: appContextType = {
  username: "",
  setUsername: () => {},
  keywords: "",
  setKeywords: () => {},
  showForm: true,
  toggleForm: () => {},
  list: [],
  setList: ([]) => {},
  languageList: [],
  setLanguageList: ([]) => {},
  // languageSelection: [],
  // setLanguageSelection: ([]) => {},
};

export const AppContext = createContext<appContextType>(
  appContextDefaultValues
);

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  const [username, setUsername] = useState<string>(
    appContextDefaultValues.username
  );
  const [keywords, setKeywords] = useState<string>(
    appContextDefaultValues.keywords
  );
  const [showForm, setShowForm] = useState<boolean>(
    appContextDefaultValues.showForm
  );
  const [list, setList] = useState<RepositoryData[]>(
    appContextDefaultValues.list
  );
  const [languageList, setLanguageList] = useState<Language[]>(
    appContextDefaultValues.languageList
  );
  // const [languageSelection, setLanguageSelection] = useState<boolean[]>(
  //   appContextDefaultValues.languageSelection
  // );

  function toggleForm() {
    setShowForm(!showForm);
  }

  const value = {
    username,
    setUsername,
    keywords,
    setKeywords,
    showForm,
    toggleForm,
    list,
    setList,
    languageList,
    setLanguageList,
    // languageSelection,
    // setLanguageSelection,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
