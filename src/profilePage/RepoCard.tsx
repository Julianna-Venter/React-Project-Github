import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { octokit } from "../../environment/apiKey";
import { hexColors } from "../Models/data";
import {
  BranchInfo,
  Commit,
  CommitItem,
  LanguageData,
  Parent,
  RepoItem,
} from "../Models/interfaces";

interface RepoCardProps {
  repoName: string;
  repoInfo: RepoItem;
  sendUpLangauges: (languages: LanguageData) => void;
  sendUpCommits: (commits: CommitItem[]) => void;
}

const RepoCard: React.FC<RepoCardProps> = ({
  repoName,
  repoInfo,
  sendUpLangauges,
  sendUpCommits,
}) => {
  const [branches, setBranches] = useState<BranchInfo[]>([]);
  const [branchNumber, setBranchNumber] = useState<number>();
  const [languages, setLanguages] = useState<LanguageData>({});
  const [commits, setCommits] = useState<LanguageData[]>([]);

  useEffect(() => {
    getBranches();
    getLanguages();
    getCommits();
  }, []);

  //only used branches length here, but will use rest of the response in a future update
  const getBranches = async () => {
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

  const getCommits = async () => {
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
  const getLanguages = async () => {
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

  //converting the amount of languages to a percentage
  function getPercentage(num: number): string {
    const total = Object.values(languages).reduce((a, b) => a + b, 0);
    return ((num / total) * 100).toFixed(2);
  }

  useQuery({
    queryKey: ["branches"],
    queryFn: getBranches,
    enabled: false,
  });

  useQuery({
    queryKey: ["languages"],
    queryFn: getLanguages,
    enabled: false,
  });

  useQuery({
    queryKey: ["commits"],
    queryFn: getCommits,
    enabled: false,
  });

  return (
    <div className="w-full h-[9.375rem] bg-off-white rounded-xl shadow-4xl p-3 flex flex-col justify-center text-dark-text">
      <div className="flex justify-between items-center mb-1">
        <div className="flex justify-center items-center">
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            data-view-component="true"
            className="octicon octicon-repo mr-1"
            fill="currentColor"
          >
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
          </svg>
          <label>{repoName}</label>
        </div>
        <div className="badge bg-off-white flex gap-2">
          <span>{repoInfo.private ? <p>Private</p> : <p>Public</p>}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
      </div>

      <div className="flex justify-between items-center mb-5">
        <div id="branches" className="flex justify-center items-center gap-1">
          <span>{branchNumber}</span>
          <svg
            aria-hidden="true"
            focusable="false"
            role="img"
            className="octicon octicon-git-branch"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"></path>
          </svg>
        </div>
        <div id="stars" className="flex justify-center items-center gap-1">
          <span>{repoInfo.stargazers_count}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        </div>
      </div>

      <div id="usageBar">
        <div className="w-full bg-dark-off-white rounded-full h-1.5 flex overflow-hidden flex">
          {Object.entries(languages)
            .slice(0, 8)
            .map(([language, count], index) => {
              const color = hexColors[index].color;
              return (
                <div
                  key={`${repoInfo.id}_${language}_${index}`}
                  className="h-1.5"
                  style={{
                    width: `${getPercentage(count)}%`,
                    backgroundColor: color,
                  }}
                ></div>
              );
            })}
        </div>
      </div>

      <div id="langauges">
        <div className="flex justify-start items-center gap-x-8 gap-y-2 m-2 flex-wrap">
          {Object.entries(languages)
            .slice(0, 8)
            .map(([language, count], index) => {
              const color = hexColors[index].color;

              return (
                <div
                  key={repoInfo.id + language}
                  className="flex items-center gap-1.5"
                >
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: color,
                    }}
                  ></div>
                  <span className="text-xs flex gap-1.5">
                    <p>{language} </p>
                    <p className="text-lighter-text text-[1em]">
                      {getPercentage(count)}%
                    </p>
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
