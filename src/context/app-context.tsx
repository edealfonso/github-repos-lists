"use client";
import { RepositoryData } from "@/lib/types";
import { createContext, ReactNode, useState } from "react";

type appContextType = {
  username: string;
  setUsername: (username: string) => void;
  showForm: boolean;
  toggleForm: () => void;
  list: RepositoryData[] | any;
  setList: (list: RepositoryData[] | any) => void;
};

const appContextDefaultValues: appContextType = {
  username: "",
  setUsername: () => {},
  showForm: true,
  toggleForm: () => {},
  list: [],
  setList: ([]) => {},
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
  const [showForm, setShowForm] = useState<boolean>(
    appContextDefaultValues.showForm
  );
  const [list, setList] = useState<boolean>(appContextDefaultValues.list);

  function toggleForm() {
    setShowForm(!showForm);
  }

  const value = {
    username,
    setUsername,
    showForm,
    toggleForm,
    list,
    setList,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
