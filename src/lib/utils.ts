import { Language, RepositoryData } from "./types";

// get all languages from list of repositories
// create the array that will be used to create filters
// and build API query search
export function collectLanguages(items: RepositoryData[]): Language[] {
  return items
    .reduce((acc: string[], current: RepositoryData) => {
      if (current.language && !acc.includes(current.language)) {
        acc.push(current.language);
      }
      return acc;
    }, [])
    .sort(function (a, b) {
      return a === b ? 0 : a < b ? -1 : 1;
    })
    .map((item) => {
      return {
        name: item,
        active: false,
      };
    });
}
