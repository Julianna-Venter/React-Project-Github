import { SetStateAction } from "react";
import { octokit } from "../../../environment/apiKey";
import {
  BranchInfo,
  Commit,
  CommitData,
  CommitItem,
  LanguageData,
  Parent,
  RepoItem,
} from "../../Models/interfaces";

export const getCommits = async (
  repoInfo: RepoItem,
  setCommits: {
    (value: SetStateAction<CommitData[]>): void;
  },
  sendUpCommits: { (commits: CommitItem[]): void }
) => {
  if (repoInfo) {
    try {
      const res = await octokit.request(
        `GET https://api.github.com/repos/${repoInfo.full_name}/commits`
      );

      if (res.status === 200) {
        const data = res.data;
        const newCommits = data.map(
          (commit: { sha: string; commit: Commit; parents: Parent[] }) => ({
            sha: commit.sha,
            commit: commit.commit,
            parents: commit.parents,
          })
        );
        setCommits(newCommits);
        sendUpCommits(newCommits);
        console.log(newCommits);
        return newCommits;
      } else {
        console.error("Request failed with status:", res.status);
        setCommits([]);
        return [];
      }
    } catch (error) {
      console.error("Error fetching repositories:", error);
      setCommits([]);
      return [];
    }
  }
};

//langauges are already ordered by size in the response
//in the element, it is sliced to only show the top 8 to co-incide with the colors
export const getLanguages = async (
  repoInfo: RepoItem,
  setLanguages: {
    (value: SetStateAction<LanguageData>): void;
  },
  sendUpLangauges: { (languages: LanguageData): void }
) => {
  if (repoInfo) {
    try {
      const res = await octokit.request(
        `GET https://api.github.com/repos/${repoInfo.full_name}/languages`
      );
      if (res.status === 200) {
        const languages = res.data;
        setLanguages(languages);
        sendUpLangauges(languages);
        return languages;
      } else {
        console.error("Request failed with status:", res.status);
        setLanguages({});

        return [];
      }
    } catch (error) {
      console.error("Error fetching languages:", error);
      setLanguages({});
      return [];
    }
  }
};

//only used branches length here, but will use rest of the response in a future update
export const getBranches = async (
  repoInfo: RepoItem,
  setBranches: {
    (value: SetStateAction<BranchInfo[]>): void;
  },
  setBranchNumber: { (branchNumber: number): void }
) => {
  if (repoInfo) {
    try {
      const res = await octokit.request(
        `GET https://api.github.com/repos/${repoInfo.full_name}/branches`
      );

      if (res.status === 200) {
        let branches = res.data.length;
        const data = res.data;
        const newBranches = data.map(
          (repo: { name: string; protected: boolean }) => ({
            name: repo.name,
            protected: repo.protected,
          })
        );
        setBranches(newBranches);
        setBranchNumber(branches);
        return newBranches;
      } else {
        console.error("Request failed with status:", res.status);
        setBranches([]);
        return [];
      }
    } catch (error) {
      console.error("Error fetching repositories:", error);
      setBranches([]);
      return [];
    }
  }
};
