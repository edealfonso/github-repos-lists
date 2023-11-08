import React, { ReactNode, useState } from "react";

interface Props {
  children?: ReactNode;
  onButtonClick?: () => void;
}

export default function LanguageTag({ children, onButtonClick }: Props) {
  const [active, setActive] = useState(false);

  function handleClick() {
    if (onButtonClick) {
      setActive((current) => !current);
      onButtonClick();
    }
  }

  return (
    <button onClick={handleClick}>
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
