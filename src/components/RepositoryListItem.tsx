import { RepositoryData } from "@/lib/types";
import Tag from "./common/Tag";

interface Props {
  item: RepositoryData;
}

export default function RepositoryListItem({ item }: Props) {
  return (
    <li className="">
      <a className="no-underline pr-2" href={item.html_url} target="_blank">
        <h2 className="inline">{item.name}</h2>{" "}
      </a>
      {item.language && <Tag>{item.language}</Tag>}
      {item.fork && <Tag highlight>Forked</Tag>}
    </li>
  );
}
