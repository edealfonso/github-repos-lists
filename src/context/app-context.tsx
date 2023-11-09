"use client";
import { Language, RepositoryData } from "@/lib/types";
import { createContext, ReactNode, useState } from "react";

type appContextType = {
  username: string;
  setUsername: (username: string) => void;
  keywords: string;
  setKeywords: (username: string) => void;
  showPopup: boolean;
  togglePopup: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  list: RepositoryData[] | any;
  setList: RepositoryData[] | any;
  languageList: Language[];
  setLanguageList: (languages: Language[]) => void;
};

const appContextDefaultValues: appContextType = {
  username: "",
  setUsername: () => {},
  keywords: "",
  setKeywords: () => {},
  showPopup: true,
  togglePopup: () => {},
  isLoading: false,
  setIsLoading: () => {},
  list: [],
  setList: ([]) => {},
  languageList: [],
  setLanguageList: ([]) => {},
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
  const [showPopup, setShowPopup] = useState<boolean>(
    appContextDefaultValues.showPopup
  );
  const [isLoading, setIsLoading] = useState<boolean>(
    appContextDefaultValues.isLoading
  );
  const [list, setList] = useState<RepositoryData[]>(
    appContextDefaultValues.list
  );
  const [languageList, setLanguageList] = useState<Language[]>(
    appContextDefaultValues.languageList
  );

  function togglePopup() {
    setShowPopup(!showPopup);
  }

  const value = {
    username,
    setUsername,
    keywords,
    setKeywords,
    showPopup,
    togglePopup,
    isLoading,
    setIsLoading,
    list,
    setList,
    languageList,
    setLanguageList,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
