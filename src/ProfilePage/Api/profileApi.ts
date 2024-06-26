import { octokit } from "../../../environment/apiKey";
import {
  BranchInfo,
  CommitItem,
  LanguageData,
  ProfileItem,
  RepoItem,
} from "../../Models/interfaces";

export const getCommits = async (full_name: string): Promise<CommitItem[]> => {
  if (!full_name) {
    return [];
  }

  const commitsUrl = `https://api.github.com/repos/${full_name}/commits`;
  const commitsData = await getPaginatedData(commitsUrl, 250);

  const newCommits = commitsData?.map((commit: CommitItem) => ({
    sha: commit.sha,
    commit: commit.commit,
    parents: commit.parents,
  }));

  return newCommits ?? [];
};

//langauges are already ordered by size in the response
//in the element, it is sliced to only show the top 8 to co-incide with the colors
export const getLanguages = async (
  repoInfo: RepoItem
): Promise<LanguageData | undefined> => {
  if (repoInfo) {
    const res = await octokit.request(
      `GET https://api.github.com/repos/${repoInfo.full_name}/languages`
    );
    if (res.status === 200) {
      return res.data;
    }
  } else {
    return undefined;
  }
};

//only used branches length here, but will use rest of the response in a future update
export const getBranches = async (full_name: string): Promise<BranchInfo[]> => {
  if (!full_name) {
    return [];
  }

  const branchesUrl = `https://api.github.com/repos/${full_name}/branches`;
  const branchesData = await getPaginatedData(branchesUrl, 99);

  const newBranches = branchesData?.map((branch: BranchInfo) => ({
    name: branch.name,
    protected: branch.protected,
  }));

  return newBranches ?? [];
};

export const getStats = async (
  username: string | undefined
): Promise<number> => {
  if (!username) {
    return 0;
  }

  const starredUrl = `https://api.github.com/users/${username}/starred`;
  const starredData = await getPaginatedData(starredUrl, 999);

  const stars = starredData?.length;
  return stars ?? 0;
};

export const getRepos = async (profileName: string): Promise<RepoItem[]> => {
  if (!profileName) {
    return [];
  }

  const reposUrl = `https://api.github.com/users/${profileName}/repos?sort=updated`;
  const reposData = await getPaginatedData(reposUrl, 80);

  const newRepos = reposData?.map((repo: RepoItem) => ({
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
    size: repo.size,
  }));

  return newRepos ?? [];
};

export const getProfile = async (profileName: string): Promise<ProfileItem> => {
  const res = await octokit.request(
    `GET https://api.github.com/users/${profileName}`
  );

  const profile = {
    name: res.data.name,
    bio: res.data.bio,
    login: res.data.login,
    avatar_url: res.data.avatar_url,
    followers: res.data.followers,
    following: res.data.following,
    organizations_url: res.data.organizations_url,
  };
  return profile;
};

//TODO: rewrite this with explicit typing later
//Got these functions from the github docs
//https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28
async function getPaginatedData(url: string, limit: number) {
  const nextPattern = /(?<=<)([\S]*)(?=>; rel="next")/i;
  let pagesRemaining: string | boolean | undefined = true;
  let data: any[] = [];

  while (pagesRemaining) {
    try {
      const response = await octokit.request(`GET ${url}`, {
        per_page: 100,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      const parsedData = parseData(response.data);
      data = [...data, ...parsedData];

      if (data.length >= limit) {
        data = data.slice(0, limit);
        break;
      }

      const linkHeader = response.headers.link;

      pagesRemaining = linkHeader && linkHeader.includes(`rel=\"next\"`);

      if (pagesRemaining && linkHeader) {
        url = linkHeader.match(nextPattern)![0];
      }
    } catch (error: any) {
      if (error.status === 409) {
        return;
      }
    }
  }

  return data;
}

function parseData(data: any) {
  // If the data is an array, return that
  if (Array.isArray(data)) {
    return data;
  }

  // Some endpoints respond with 204 No Content instead of empty array
  // when there is no data. In that case, return an empty array.
  if (!data) {
    return [];
  }

  // Otherwise, the array of items that we want is in an object
  // Delete keys that don't include the array of items
  delete data.incomplete_results;
  delete data.repository_selection;
  delete data.total_count;
  // Pull out the array of items
  const namespaceKey = Object.keys(data)[0];
  data = data[namespaceKey];

  return data;
}
