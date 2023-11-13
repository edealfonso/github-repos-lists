"use client";
import { Language, RepositoryData } from "@/lib/types";
import { createContext, ReactNode, useState } from "react";

type appContextType = {
  username: string;
  setUsername: (username: string) => void;
  keywords: string;
  setKeywords: (username: string) => void;
  hideForkedRepos: boolean;
  setHideForkedRepos: (hideForkedRepos: boolean) => void;
  list: RepositoryData[] | any;
  setList: RepositoryData[] | any;
  languageList: Language[];
  setLanguageList: (languages: Language[]) => void;
  showPopup: boolean;
  togglePopup: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const appContextIni: appContextType = {
  username: "",
  setUsername: () => {},
  keywords: "",
  setKeywords: () => {},
  hideForkedRepos: false,
  setHideForkedRepos: () => {},
  list: [],
  setList: ([]) => {},
  languageList: [],
  setLanguageList: ([]) => {},
  showPopup: true,
  togglePopup: () => {},
  isLoading: false,
  setIsLoading: () => {},
};

export const AppContext = createContext<appContextType>(appContextIni);

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  const [username, setUsername] = useState<string>(appContextIni.username);
  const [keywords, setKeywords] = useState<string>(appContextIni.keywords);
  const [hideForkedRepos, setHideForkedRepos] = useState<boolean>(
    appContextIni.hideForkedRepos
  );
  const [list, setList] = useState<RepositoryData[]>(appContextIni.list);
  const [languageList, setLanguageList] = useState<Language[]>(
    appContextIni.languageList
  );
  const [showPopup, setShowPopup] = useState<boolean>(appContextIni.showPopup);
  const [isLoading, setIsLoading] = useState<boolean>(appContextIni.isLoading);

  function togglePopup() {
    setShowPopup(!showPopup);
  }

  const value = {
    username,
    setUsername,
    keywords,
    setKeywords,
    hideForkedRepos,
    setHideForkedRepos,
    list,
    setList,
    languageList,
    setLanguageList,
    showPopup,
    togglePopup,
    isLoading,
    setIsLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
