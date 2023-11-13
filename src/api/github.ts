import { SearchData } from "@/lib/types";

export function searchRepositories({
  username,
  keywords = "",
  languageList = [],
  hideForkedRepos = false,
}: SearchData): Promise<any> {
  // generate query string for language filtering
  const languages = languageList.reduce((acc, current) => {
    // only add active languages
    if (current.active) {
      // get language name
      let languageName = current.name;

      // we must check if language has spaces
      // in that case, it must be wrapped in "" **(*NOTE2*)**
      if (languageName.indexOf(" ") >= 0) {
        languageName = `"${languageName}"`;
      }

      // build query
      return acc + " language:" + languageName;
    } else {
      return acc;
    }
  }, "");

  // building final query **(*NOTE1*)**
  const queryString =
    "q=" +
    encodeURIComponent(
      `${keywords} ${languages} user:${username} sort:updated ${
        hideForkedRepos ? "" : "fork:true"
      }`
    ) +
    "&per_page=100";

  // final url
  const url = `https://api.github.com/search/repositories?${queryString}`;
  console.log("Fetched REST API:", url);

  // return fetch promise
  return fetch(url, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: "Bearer " + process.env.GITHUB_AUTH_KEY,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export function getUser(username: string): Promise<any> {
  // final url
  const url = `https://api.github.com/users/${username}`;
  console.log("Fetched REST API:", url);

  // return fetch promise
  return fetch(url, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: "Bearer " + process.env.GITHUB_AUTH_KEY,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
