import { octokit } from "../../../environment/apiKey";
import { CollabItem, MainItem } from "../../models/interfaces";

const baseUrl = "https://api.github.com/repos/";

export const getOpenIssues = async (
  name: string,
  repo: string
): Promise<number> => {
  if (!repo || !name) {
    return 0;
  }

  const issuesUrl = `${baseUrl}${name}/${repo}/issues?state=open`;
  const issuesData = await getPaginatedData(issuesUrl);

  const filteredIssues = issuesData.filter((issue) => !issue.pull_request);

  return filteredIssues.length;
};

export const getClosedIssues = async (
  name: string,
  repo: string
): Promise<number> => {
  if (!name || !repo) {
    return 0;
  }

  const issuesUrl = `${baseUrl}${name}/${repo}/issues?state=closed`;
  const issuesData = await getPaginatedData(issuesUrl);

  const filteredIssues = issuesData.filter((issue) => !issue.pull_request);

  return filteredIssues.length;
};

export const getOpenPulls = async (
  name: string,
  repo: string
): Promise<number> => {
  if (!name || !repo) {
    return 0;
  }

  const pullsUrl = `${baseUrl}${name}/${repo}/pulls?state=open`;
  const pullsData = await getPaginatedData(pullsUrl);

  return pullsData.length;
};

export const getClosedPulls = async (
  name: string,
  repo: string
): Promise<number> => {
  if (!name || !repo) {
    return 0;
  }

  const pullsUrl = `${baseUrl}${name}/${repo}/pulls?state=closed`;
  const pullsData = await getPaginatedData(pullsUrl);

  return pullsData.length;
};

export const getContributors = async (
  name: string,
  repo: string
): Promise<CollabItem[]> => {
  if (!name || !repo) {
    return [];
  }

  const collabUrl = `${baseUrl}${name}/${repo}/collaborators`;
  const collabData = await getPaginatedData(collabUrl);

  const newCollab = collabData.map((collab: CollabItem) => ({
    login: collab.login,
    avatar_url: collab.avatar_url,
    permissions: collab.permissions,
  }));

  const filteredCollab = newCollab.filter(
    (collab) => collab.permissions.admin == true
  );

  return filteredCollab;
};

export const getMain = async (
  name: string,
  repo: string
): Promise<MainItem | undefined> => {
  if (!name || !repo) {
    return {} as MainItem;
  }

  try {
    const res = await octokit.request(
      `GET /repos/${name}/${repo}/branches/main`
    );

    if (res.status === 200) {
      const { commit, protected: isProtected } = res.data;

      return {
        commit,
        protected: isProtected,
      };
    } else if (res.status === 404) {
      return {} as MainItem;
    }
  } catch (error) {
    return {} as MainItem;
  }
};

//TODO: rewrite this with explicit typing later
//Got these functions from the github docs
//https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28
async function getPaginatedData(url: string) {
  const nextPattern = /(?<=<)([\S]*)(?=>; rel="next")/i;
  let pagesRemaining: string | boolean | undefined = true;
  let data: any[] = [];

  while (pagesRemaining) {
    const response = await octokit.request(`GET ${url}`, {
      per_page: 100,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    const parsedData = parseData(response.data);
    data = [...data, ...parsedData];

    const linkHeader = response.headers.link;

    pagesRemaining = linkHeader && linkHeader.includes(`rel=\"next\"`);

    if (pagesRemaining && linkHeader) {
      url = linkHeader.match(nextPattern)![0];
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
  //   when there is no data. In that case, return an empty array.
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
