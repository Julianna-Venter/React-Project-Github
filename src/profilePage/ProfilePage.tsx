import { useQueries, useQuery } from "@tanstack/react-query";
import Calendar from "react-github-contribution-calendar";
import {
  monthLabelAttributes,
  panelAttributes,
  panelColors,
  until,
  weekLabelAttributes,
} from "../models/calendarHeatmap";

import { useNavigate } from "@tanstack/react-router";
import {
  CalendarLoader,
  HeaderLoader,
  LanguagesLoader,
  RepoCardLoader,
} from "../edgeCases/Loaders";
import {
  CommitData,
  LanguageData,
  RepoItem,
  RouteParams,
} from "../models/interfaces";
import Drawer from "../navigation/Drawer";
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

function ProfilePage() {
  const navigate = useNavigate({ from: "/" });

  const { profileId } = Route.useParams<RouteParams>();
  const profileName = profileId;

  //tanstack/react-query hook to fetch the users
  const {
    data: profileData,
    isError: isProfileError,
    isPending,
    isLoading,
  } = useQuery({
    queryKey: [profileId],
    queryFn: () => getProfile(profileName),
  });

  //This does not work I will have to ask for advice on how to properly implement this
  //problem: still routes when loader is fetched (I know why, I don't know how to fix it)
  // if (!profileData && (isPending || isLoading)) {
  //   setTimeout(function () {
  //     navigate({ to: "/noData" });
  //   }, 10000);
  // }

  let { data: repoData, isError: isReposError } = useQuery({
    queryKey: ["Repos", profileId],
    queryFn: () => getRepos(profileName),
  });

  if (repoData) {
    const filteredRepoData = repoData.filter((repo) => repo.size !== 0);
    repoData = filteredRepoData;
  }

  const { data: starsData, isError: isStarsError } = useQuery({
    queryKey: ["Stars", profileId],
    queryFn: () => getStats(profileId),
  });

  const branchQueries = useQueries({
    queries:
      repoData?.map((repoInfo) => {
        return {
          queryKey: ["branch", repoInfo.id],
          queryFn: () => getBranches(repoInfo.full_name),
          enabled: !!repoData,
        };
      }) ?? [],
  });

  const commitsQueries = useQueries({
    queries:
      repoData?.map((repoInfo) => {
        return {
          queryKey: ["commits", repoInfo.id],
          queryFn: () => getCommits(repoInfo.full_name),
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

  if (isReposError || isProfileError || isStarsError) {
    navigate({ to: "/error" });
  }

  if (branchQueries) {
    branchQueries.forEach((queryResult) => {
      if (queryResult.isError) {
        navigate({ to: "/error" });
      }
    });
  }

  if (commitsQueries) {
    commitsQueries.forEach((queryResult) => {
      if (queryResult.isError) {
        navigate({ to: "/error" });
      }
    });
  }

  if (languagesQueries) {
    languagesQueries.forEach((queryResult) => {
      if (queryResult.isError) {
        navigate({ to: "/error" });
      }
    });
  }

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
          {repoData && commitsNumber ? (
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
                  repoNumber={repoData?.length}
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
          ) : (
            <HeaderLoader />
          )}
          <div className="detailsContainer w-full flex flex-col gap-5 mt-4 lg:w-5/6">
            {languagesQueriesData.length != 0 && languagesQueries ? (
              <StatsRadial result={languagesQueriesData} />
            ) : (
              <LanguagesLoader />
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
                <CalendarLoader />
              )}
            </div>

            <div className="flex flex-col gap-5 lg:px-20">
              {repoData ? (
                Object.values(repoData).map((repo: RepoItem) => (
                  <RepoCard
                    key={repo.id}
                    repoName={repo.name}
                    repoInfo={repo}
                    branchNumber={returnBranches(repo.name)}
                    languageData={returnLanguages(repo.name)}
                    profileId={profileId}
                  />
                ))
              ) : (
                <RepoCardLoader />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
