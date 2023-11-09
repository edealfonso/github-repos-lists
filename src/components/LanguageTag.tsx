import { AppContext } from "@/context/app-context";
import React, { ReactNode, useContext, useEffect, useState } from "react";

interface Props {
  children?: ReactNode;
  onButtonClick?: () => void;
  index?: number;
}

export default function LanguageTag({ children, onButtonClick, index }: Props) {
  const [active, setActive] = useState(false);
  const { languageList } = useContext(AppContext);

  useEffect(() => {
    // update active state if languageList is changed from outside the component (e.g: "Clear" button)
    if (index) {
      setActive(languageList[index].active);
    }
  }, [languageList, index]);

  function handleClick() {
    if (onButtonClick) {
      setActive((current) => !current);
      onButtonClick();
    }
  }

  return (
    <button
      onClick={handleClick}
      className={onButtonClick ? "cursor-pointer" : "cursor-default"}
    >
      <small
        className="block opacity-50 outline py-0.5 px-1 rounded-sm"
        style={{
          backgroundColor: active ? "blue" : "unset",
          color: active ? "white" : "unset",
        }}
      >
        {children}
      </small>
    </button>
  );
}
