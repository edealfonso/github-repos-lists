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
    } else {
      // this ensures a reset for new elements when language list is re-populated for a new user name
      setActive(false);
    }
  }, [languageList, index]);

  function handleClick() {
    if (onButtonClick) {
      setActive((current) => !current);
      onButtonClick();
    }
  }

  return (
    <a
      onClick={handleClick}
      className={
        onButtonClick
          ? "cursor-pointer no-underline text-inherit"
          : "cursor-default no-underline text-inherit"
      }
    >
      <small
        className="block opacity-50  outline py-0.5 px-1 rounded-sm"
        style={{
          backgroundColor: active ? "blue" : "unset",
          color: active ? "beige" : "unset",
          outlineColor: active ? "blue" : "inherit",
        }}
      >
        {children}
      </small>
    </a>
  );
}
