import { Language } from "@/lib/types";
import { Octokit } from "@octokit/core";

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  auth: "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",
});

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
    );

  console.log(`https://api.github.com/search/repositories?${queryString}`);

  return fetch(`https://api.github.com/search/repositories?${queryString}`, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: "Bearer " + "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",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
