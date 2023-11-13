import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function ErrorMessage({ children }: Props) {
  return <small className="text-error">{children}</small>;
}
