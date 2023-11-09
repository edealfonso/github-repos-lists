import { RepositoryData } from "@/lib/types";
import LanguageTag from "./LanguageTag";

interface Props {
  item: RepositoryData;
}

export default function RepositoryListItem({ item }: Props) {
  return (
    <li className="">
      <a className="no-underline pr-2" href={item.html_url} target="_blank">
        <h2 className="inline">{item.name}</h2>{" "}
      </a>
      {item.language && <LanguageTag>{item.language}</LanguageTag>}
    </li>
  );
}
