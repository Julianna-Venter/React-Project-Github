export interface Option {
  value: string;
  label: string;
}

export interface ProfileItem {
  login: string;
  avatar_url: string;
  name: string;
  bio: any;
  followers: number;
  following: number;
  organizations_url: string;
}

export interface RepoItem {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  description: string;
  collaborators_url: string;
  branches_url: string;
  contributors_url: string;
  commits_url: string;
  git_commits_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  language: string;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
  stargazers_count: number;
  size: number;
}

export interface BranchInfo {
  name: string;
  protected: boolean;
}

export interface CommitItem {
  sha: string;
  commit: Commit;
  parents: Parent[];
}

export interface Commit {
  author: Author;
  message: string;
}

export interface Author {
  name: string;
  date: string;
}

export interface Parent {
  sha: string;
  url: string;
  html_url: string;
}

export interface LanguageData {
  [key: string]: number;
}

export interface CommitData {
  [key: string]: number;
}

export interface LanguageObjectItem {
  repoName: string;
  languageData: LanguageData;
}
