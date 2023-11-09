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

  // we update active state if languageList is changed
  // from outside the component (e.g: "Clear" button)
  useEffect(() => {
    if (index) {
      setActive(languageList[index].active);
    } else {
      // this ensures a reset for new elements
      // when language list is re-populated for a new user name **(*NOTE3*)**
      setActive(false);
    }
  }, [languageList, index]);

  function handleClick() {
    if (onButtonClick) {
      // first of all, we change the loop of the button
      // to engage the user
      setActive((current) => !current);

      // then we process everything else
      onButtonClick();
    }
  }

  return (
    <>
      {onButtonClick && (
        <a
          onClick={handleClick}
          className="py-0.5 px-1 no-underline text-inherit outline rounded-sm text-sm opacity-50 dark:opacity-100 hover:opacity-100"
          style={
            active
              ? {
                  backgroundColor: "var(--button-color)",
                  color: "var(--background-alt-color)",
                  outlineColor: "var(--button-color)",
                  opacity: 1,
                }
              : {}
          }
        >
          {children}
        </a>
      )}
      {!onButtonClick && (
        <small className="inline-block opacity-40 dark:opacity-60 block outline py-0.5 px-1 rounded-sm outline align-[2px]">
          {children}
        </small>
      )}
    </>
  );
}
