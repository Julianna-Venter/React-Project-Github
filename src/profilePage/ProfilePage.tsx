import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Calendar from "react-github-contribution-calendar";
import {
  monthLabelAttributes,
  panelAttributes,
  panelColors,
  until,
  weekLabelAttributes,
} from "../Models/calendarHeatmap";
import {
  CommitData,
  CommitItem,
  LanguageData,
  ProfileItem,
  RepoItem,
} from "../Models/interfaces";
import Drawer from "../Navigation/Drawer";
import { Route } from "../routes";
import { getProfile, getRepos } from "./Api/profileApi";
import QuickStats from "./QuickStats";
import RepoCard from "./RepoCard";
import StatsCarousel from "./StatsCarousel";
import StatsRadial from "./StatsRadial";

interface RouteParams {
  profileId: string;
}

function ProfilePage() {
  const [profile, setProfile] = useState<ProfileItem | null>(null);
  const [repos, setRepos] = useState<RepoItem[]>([]);
  const [repoNumber, setRepoNumber] = useState<number>(0);
  const [commitsNumber, setCommitsNumber] = useState<number>(0);
  const [dataReady, setDataReady] = useState(false);
  const [result, setResult] = useState<LanguageData>({});
  const [commitsReady, setCommitsReady] = useState(false);
  const [commits, setCommits] = useState<CommitData>({});

  const { profileId } = Route.useParams<RouteParams>();
  const profileName = profileId;

  useEffect(() => {
    getProfile(profileName, setProfile);
    getRepos(profileName, setRepos, setRepoNumber);
  }, []);

  //tanstack/react-query hook to fetch the users
  useQuery({
    queryKey: [profileName?.trim()],
    queryFn: () => getProfile(profileName, setProfile),
    enabled: false,
  });

  useQuery({
    queryKey: ["Repos"],
    queryFn: () => getRepos(profileName, setRepos, setRepoNumber),
    enabled: false,
  });

  function giveMeLanguages(languages: LanguageData) {
    setResult((prevResult) => {
      // Create a copy of the previous state
      const updatedResult = { ...prevResult };

      // Update counts or add new languages
      for (const [language, count] of Object.entries(languages)) {
        if (updatedResult[language]) {
          updatedResult[language] += count;
        } else {
          updatedResult[language] = count;
        }
      }

      const sortedResult = Object.fromEntries(
        Object.entries(updatedResult).sort(
          ([, countA], [, countB]) => countB - countA
        )
      );

      return sortedResult;
    });

    setDataReady(true);
  }

  const currentDate = new Date();
  const previousDate = new Date(currentDate.getDate() - 359);

  function giveMeCommits(commits: CommitItem[]) {
    const totalCommits = commits.length;

    setCommitsNumber((prevCommitsNumber) =>
      prevCommitsNumber ? prevCommitsNumber + totalCommits : totalCommits
    );

    setCommits((prevCommits) => {
      const updatedCommits = { ...prevCommits };

      commits.forEach((commitItem) => {
        const { date } = commitItem.commit.author;
        const commitDate = new Date(date);
        const formattedCommitDate = commitDate.toISOString().substring(0, 10);
        const formattedPreviousDate = previousDate
          .toISOString()
          .substring(0, 10);

        var commitDateCompare = new Date(formattedCommitDate);
        var oldDateCompare = new Date(formattedPreviousDate);

        // Check if the commit date is on or after previousDate
        if (commitDateCompare >= oldDateCompare) {
          updatedCommits[formattedCommitDate] =
            (updatedCommits[formattedCommitDate] || 0) + 1;
        }
      });

      return updatedCommits;
    });

    setCommitsReady(true);
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
                  <img src={profile?.avatar_url} alt="Profile Avatar" />
                </div>
              </div>
              <QuickStats
                username={profile?.login}
                repoNumber={repoNumber}
                commits={commitsNumber}
              />
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="font-bold text-dark-text text-xl">
                  {profile?.name}
                </label>
                <label className="text-lighter-text text-lg">
                  {profile?.login}
                </label>
                <p className="text-dark-text text-sm mt-2">{profile?.bio}</p>
              </div>
              <StatsCarousel
                followers={profile?.followers}
                following={profile?.following}
                url={profile?.organizations_url}
              />
            </div>
          </div>
          <div className="detailsContainer w-full flex flex-col gap-5 mt-4 lg:w-5/6">
            <StatsRadial result={result} dataReady={dataReady} />
            <div className="lg:pl-5 flex flex-col m-5">
              {commitsReady ? (
                <>
                  <Calendar
                    values={commits}
                    until={until}
                    weekLabelAttributes={weekLabelAttributes}
                    monthLabelAttributes={monthLabelAttributes}
                    panelAttributes={panelAttributes}
                    panelColors={panelColors}
                  />
                  <div className="flex gap-5 items-center text-dark-text text-sm self-center">
                    <span>Less</span>
                    <div className="flex gap-2">
                      {panelColors.map((color, index) => (
                        <div
                          key={index}
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
              {repos.slice(0, 3).map((repo) => (
                <RepoCard
                  key={repo.name}
                  repoName={repo.name}
                  repoInfo={repo}
                  sendUpLangauges={giveMeLanguages}
                  sendUpCommits={giveMeCommits}
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
