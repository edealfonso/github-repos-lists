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
  showForm: true,
  toggleForm: () => {},
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
  const [showForm, setShowForm] = useState<boolean>(
    appContextDefaultValues.showForm
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
    isLoading,
    setIsLoading,
    list,
    setList,
    languageList,
    setLanguageList,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
