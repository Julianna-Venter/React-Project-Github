import { useQueries, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Calendar from "react-github-contribution-calendar";
import {
  monthLabelAttributes,
  panelAttributes,
  panelColors,
  until,
  weekLabelAttributes,
} from "../Models/calendarHeatmap";

import { CommitData, LanguageData, RepoItem } from "../Models/interfaces";
import Drawer from "../Navigation/Drawer";
import { Route } from "../routes";
import {
  getBranches,
  getCommits,
  getLanguages,
  getProfile,
  getRepos,
  getStats,
} from "./Api/profileApi";
import QuickStats from "./QuickStats";
import RepoCard from "./RepoCard";
import StatsCarousel from "./StatsCarousel";
import StatsRadial from "./StatsRadial";

interface RouteParams {
  profileId: string;
}

function ProfilePage() {
  const [repoNumber, setRepoNumber] = useState<number>(0);
  const { profileId } = Route.useParams<RouteParams>();
  const profileName = profileId;

  //tanstack/react-query hook to fetch the users
  const { data: profileDat
    a } = useQuery({
    queryKey: [profileName],
    queryFn: () => getProfile(profileName),
  });

  const { data: repoData } = useQuery({
    queryKey: ["Repos", profileName],
    queryFn: () => getRepos(profileName, setRepoNumber),
  });

  const { data: starsData } = useQuery({
    queryKey: ["Stars", profileId],
    queryFn: () => getStats(profileId),
  });

  const branchQueries = useQueries({
    queries:
      repoData?.map((repoInfo) => {
        return {
          queryKey: ["branch", repoInfo.id],
          queryFn: () => getBranches(repoInfo),
          enabled: !!repoData,
        };
      }) ?? [],
  });

  const commitsQueries = useQueries({
    queries:
      repoData?.map((repoInfo) => {
        return {
          queryKey: ["commits", repoInfo.id],
          queryFn: () => getCommits(repoInfo),
          enabled: !!repoData,
        };
      }) ?? [],
  });

  const languagesQueries = useQueries({
    queries:
      repoData?.map((repoInfo) => {
        return {
          queryKey: ["languages", repoInfo.id],
          queryFn: () => getLanguages(repoInfo),
          enabled: !!repoData,
        };
      }) ?? [],
  });

  let languagesQueriesData: LanguageData[] = [];

  if (languagesQueries) {
    for (const languageQuery of languagesQueries) {
      if (languageQuery.data) {
        for (const language in languageQuery.data) {
          if (languageQuery.data.hasOwnProperty(language)) {
            const count = languageQuery.data[language];
            const existingLanguageIndex = languagesQueriesData.findIndex(
              (item) => item.hasOwnProperty(language)
            );
            if (existingLanguageIndex !== -1) {
              // Language exists, update count
              languagesQueriesData[existingLanguageIndex][language] += count;
            } else {
              // Language doesn't exist, add it
              const newLanguageData: LanguageData = {};
              newLanguageData[language] = count;
              languagesQueriesData.push(newLanguageData);
            }
          }
        }
      }
    }
    languagesQueriesData.sort((a, b) => {
      const countA = Object.values(a)[0];
      const countB = Object.values(b)[0];
      return countB - countA;
    });
  }

  let commitsData: CommitData = {};
  let commitsNumber: number = 0;

  if (commitsQueries) {
    for (const commitQuery of commitsQueries) {
      if (commitQuery.data) {
        for (const commit of commitQuery.data) {
          const { date } = commit.commit.author;
          const commitDate = new Date(date);
          const formattedCommitDate = commitDate.toISOString().substring(0, 10);

          commitsData[formattedCommitDate] =
            (commitsData[formattedCommitDate] !== undefined
              ? commitsData[formattedCommitDate]
              : 0) + 1;
        }
        commitsNumber += commitQuery.data.length;
      }
    }
  }

  function returnLanguages(repoName: string) {
    if (languagesQueries && repoData) {
      const index = repoData.findIndex((repo) => repo.name === repoName);
      return languagesQueries[index].data;
    } else {
      const temp: LanguageData = {};
      //Log an error here later
      return {};
    }
  }

  function returnBranches(repoName: string) {
    if (branchQueries && repoData) {
      const index = repoData.findIndex((repo) => repo.name === repoName);
      return branchQueries[index].data?.length;
    } else {
      const temp: LanguageData = {};
      //Log an error here later
      return 0;
    }
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center p-5 gap-5 lg:p-0">
      <Drawer username={profileName} />
      <div
        className="w-full h-full flex flex-col backdrop-blur-lg bg-off-white/30 rounded-2xl shadow-3xl px-8 py-7 flex-grow overflow-y-scroll no-scrollbar lg:m-5 lg:justify-center lg:items-center lg:absolute lg:pl-[320px] lg:pt-20 lg:backdrop-blur-0 lg:bg-transparent lg:rounded-none lg:shadow-none lg:pb-0 lg:pr-0"
        id="outerProfileContainer"
      >
        <div
          className="lg:h-full lg:w-11/12 lg:flex lg:flex-col lg:backdrop-blur-lg lg:bg-off-white/30 lg:rounded-2xl lg:shadow-3xl lg:px-8 lg:py-7 lg:flex-grow lg:overflow-y-scroll lg:no-scrollbar lg:m-5 lg:items-center lg:gap-5"
          id="InnerProfileContainer"
        >
          <div
            id="headerContainer"
            className="flex flex-col gap-5 lg:flex-row lg:justify-center lg:items-center lg:gap-10"
          >
            <div className="w-full pb-10 pt-8 self-start flex justify-center items-center gap-5 relative lg:w-fit lg:justify-start">
              <div className="avatar absolute mr-20 lg:mr-0">
                <div className="w-48 h-48 rounded-full shadow-3xl lg:w-60 lg:h-60">
                  {profileData?.avatar_url ? (
                    <img src={profileData?.avatar_url} alt="Profile Avatar" />
                  ) : (
                    <img
                      src="https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"
                      alt="Profile Avatar"
                    />
                  )}
                </div>
              </div>
              <QuickStats
                starsNumber={starsData}
                repoNumber={repoNumber}
                commits={commitsNumber}
              />
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="font-bold text-dark-text text-xl">
                  {profileData?.name}
                </label>
                <label className="text-lighter-text text-lg">
                  {profileData?.login}
                </label>
                <p className="text-dark-text text-sm mt-2">
                  {profileData?.bio}
                </p>
              </div>
              <StatsCarousel
                followers={profileData?.followers}
                following={profileData?.following}
              />
            </div>
          </div>
          <div className="detailsContainer w-full flex flex-col gap-5 mt-4 lg:w-5/6">
            {languagesQueriesData.length != 0 && (
              <StatsRadial result={languagesQueriesData} />
            )}
            <div className="flex flex-col m-5 lg:px-20">
              {Object.keys(commitsData).length != 0 ? (
                <>
                  <Calendar
                    values={commitsData}
                    until={until}
                    weekLabelAttributes={weekLabelAttributes}
                    monthLabelAttributes={monthLabelAttributes}
                    panelAttributes={panelAttributes}
                    panelColors={panelColors}
                  />
                  <div className="flex gap-5 items-center text-dark-text text-sm self-center">
                    <span>Less</span>
                    <div className="flex gap-2">
                      {panelColors.map((color) => (
                        <div
                          key={color}
                          className="w-2.5 h-2.5 rounded-sm"
                          style={{
                            backgroundColor: color,
                          }}
                        ></div>
                      ))}
                    </div>
                    <span>More</span>
                  </div>
                </>
              ) : (
                <div>Loading...</div>
              )}
            </div>

            <div className="flex flex-col gap-5 lg:px-20">
              {repoData &&
                Object.values(repoData).map((repo: RepoItem) => (
                  <RepoCard
                    key={repo.id}
                    repoName={repo.name}
                    repoInfo={repo}
                    branchNumber={returnBranches(repo.name)}
                    languageData={returnLanguages(repo.name)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
