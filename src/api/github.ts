import { Language } from "@/lib/types";

export function searchRepositories(
  username: string,
  keywords: string = "",
  languageArray: Language[] = []
): Promise<any> {
  const languages = languageArray.reduce((acc, current) => {
    if (current.active) {
      let languageName = current.name;
      if (languageName.indexOf(" ") >= 0) {
        languageName = `"${languageName}"`;
      }
      return acc + " language:" + languageName;
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
  console.log("Fetched REST API:", url);

  return fetch(url, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: "Bearer " + process.env.GITHUB_AUTH_KEY,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
