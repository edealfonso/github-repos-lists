export interface RepositoryData {
  name: string;
  html_url: string;
  language: string;
  fork: boolean;
}

export interface Language {
  name: string;
  active: boolean;
}

export interface SearchData {
  username: string;
  keywords?: string;
  languageList?: Language[];
  hideForkedRepos?: boolean;
}
