import { RepositoryData } from "../lib/types";

export async function getRepositoriesFromUsername(
  username: String | any
): Promise<RepositoryData[] | any> {
  if (username) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    return [];
  }
}

export async function getRepositoryLanguages(
  username: String | any
): Promise<RepositoryData[] | any> {
  if (username) {
    const response = await fetch(
      "https://api.github.com/users/edealfonso/repos"
    );
    return await response.json();
  } else {
    return [];
  }
}

export async function searchRepositories(
  username: string,
  keywords: string = "",
  language_array: string[] = []
): Promise<any> {
  const languages = language_array.reduce(
    (accumulator, currentValue) => accumulator + " language:" + currentValue,
    ""
  );
  const queryString =
    "q=" +
    encodeURIComponent(
      `${keywords} ${languages} user:${username} sort:updated`
    );

  console.log(`https://api.github.com/search/repositories?${queryString}`);

  const response = await fetch(
    `https://api.github.com/search/repositories?${queryString}`,
    {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
}
