import { Language } from "@/lib/types";

export function searchRepositories(
  username: string,
  keywords: string = "",
  language_array: Language[] = []
): Promise<any> {
  const languages = language_array.reduce((acc, current) => {
    if (current.active) {
      return acc + " language:" + current.name;
    } else {
      return acc;
    }
  }, "");

  const queryString =
    "q=" +
    encodeURIComponent(
      `${keywords} ${languages} user:${username} sort:updated`
    ) +
    "&per_page=100";

  const url = `https://api.github.com/search/repositories?${queryString}`;
  console.log(url);
  console.log("Bearer " + process.env.GITHUB_AUTH_KEY);

  return fetch(url, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: "Bearer " + process.env.GITHUB_AUTH_KEY,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
