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
  showPopup: boolean;
  togglePopup: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  list: RepositoryData[] | any;
  setList: RepositoryData[] | any;
  languageList: Language[];
  setLanguageList: (languages: Language[]) => void;
};

const appContextIni: appContextType = {
  username: "",
  setUsername: () => {},
  keywords: "",
  setKeywords: () => {},
  hideForkedRepos: false,
  setHideForkedRepos: () => {},
  showPopup: true,
  togglePopup: () => {},
  isLoading: false,
  setIsLoading: () => {},
  list: [],
  setList: ([]) => {},
  languageList: [],
  setLanguageList: ([]) => {},
};

export const AppContext = createContext<appContextType>(appContextIni);

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  const [username, setUsername] = useState<string>(appContextIni.username);
  const [keywords, setKeywords] = useState<string>(appContextIni.keywords);
  const [hideForkedRepos, setHideForkedRepos] = useState<boolean | null>(
    appContextIni.hideForkedRepos,
  );
  const [showPopup, setShowPopup] = useState<boolean>(appContextIni.showPopup);
  const [isLoading, setIsLoading] = useState<boolean>(appContextIni.isLoading);
  const [list, setList] = useState<RepositoryData[]>(appContextIni.list);
  const [languageList, setLanguageList] = useState<Language[]>(
    appContextIni.languageList,
  );

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
