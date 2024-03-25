import { SetStateAction } from "react";
import { octokit } from "../../../environment/apiKey";
import {
  BranchInfo,
  Commit,
  CommitData,
  CommitItem,
  LanguageData,
  Parent,
  ProfileItem,
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

export const getOrgs = async (
  url: string | undefined,
  setOrgs: {
    (value: SetStateAction<number | undefined>): void;
  }
) => {
  if (url) {
    try {
      const res = await octokit.request(`GET ${url}`);

      if (res.status === 200) {
        let organizations = res.data.length;
        if (organizations != 0) {
          organizations -= 1;
        }
        setOrgs(organizations);
        return organizations;
      } else {
        console.error("Request failed with status:", res.status);
        return;
      }
    } catch (error) {
      console.error("Error occurred:", error);
      return;
    }
  }
};

export const getStats = async (
  username: string | undefined,
  setStars: { (branchNumber: number): void }
) => {
  if (username) {
    try {
      const res = await octokit.request(
        `GET https://api.github.com/users/${username}/starred`
      );

      if (res.status === 200) {
        let stars = res.data.length;
        if (stars != 0) {
          stars -= 1;
        }
        setStars(stars);
        return stars;
      } else {
        console.error("Request failed with status:", res.status);
        return;
      }
    } catch (error) {
      console.error("Error occurred:", error);
      return;
    }
  }
};

export const getRepos = async (
  profileName: string,
  setRepos: {
    (value: SetStateAction<RepoItem[]>): void;
  },
  setRepoNumber: { (branchNumber: number): void }
) => {
  if (profileName) {
    try {
      const res = await octokit.request(
        `GET https://api.github.com/users/${profileName}/repos?sort=updated`
      );

      if (res.status === 200) {
        let repos = res.data.length;
        const data = res.data;
        const newRepos = data.map((repo: RepoItem) => ({
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          private: repo.private,
          description: repo.description,
          collaborators_url: repo.collaborators_url,
          branches_url: repo.branches_url,
          contributors_url: repo.contributors_url,
          commits_url: repo.commits_url,
          git_commits_url: repo.git_commits_url,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          pushed_at: repo.pushed_at,
          language: repo.language,
          forks_count: repo.forks_count,
          open_issues_count: repo.open_issues_count,
          default_branch: repo.default_branch,
          stargazers_count: repo.stargazers_count,
        }));
        setRepos(newRepos);
        setRepoNumber(repos);
        return newRepos;
      } else {
        console.error("Request failed with status:", res.status);
        setRepos([]);
        return [];
      }
    } catch (error) {
      console.error("Error fetching repositories:", error);
      setRepos([]);
      return [];
    }
  }
};

export const getProfile = async (
  profileName: string,
  setProfile: {
    (value: SetStateAction<ProfileItem | null>): void;
  }
) => {
  if (profileName) {
    const res = await octokit.request(
      `GET https://api.github.com/users/${profileName}`
    );

    if (res.status === 200) {
      const profile = {
        name: res.data.name,
        bio: res.data.bio,
        login: res.data.login,
        avatar_url: res.data.avatar_url,
        followers: res.data.followers,
        following: res.data.following,
        organizations_url: res.data.organizations_url,
      };
      setProfile(profile);
      return profile;
    } else {
      console.error("Request failed with status:", res.status);
      return;
    }
  }
};
