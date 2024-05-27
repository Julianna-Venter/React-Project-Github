import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";

import { DefaultizedPieValueType } from "@mui/x-charts";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { RepoPageLoader } from "../edgeCases/Loaders";
import { CollabItem, RepoRouteParams } from "../models/interfaces";
import Drawer from "../navigation/Drawer";
import { getCommits } from "../profilePage/Api/profileApi";
import { Route } from "../routes";
import {
  getClosedIssues,
  getClosedPulls,
  getContributors,
  getMain,
  getOpenIssues,
  getOpenPulls,
} from "./Api/repoApi";
import CommitItem from "./commitItem";

function RepoPage() {
  const { profileId, repoId } = Route.useParams<RepoRouteParams>();

  const [chartWidth, setChartWidth] = useState(500);

  useEffect(() => {
    // Update chart width dynamically on window resize
    const handleResize = () => {
      setChartWidth(window.innerWidth > 768 ? 500 : 330);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let { data: openIssuesData } = useQuery({
    queryKey: ["openIssues", repoId],
    queryFn: () => getOpenIssues(profileId, repoId),
  });

  let { data: closedIssuesData } = useQuery({
    queryKey: ["closedIssues", repoId],
    queryFn: () => getClosedIssues(profileId, repoId),
  });

  let { data: openPullsData } = useQuery({
    queryKey: ["openPulls", repoId],
    queryFn: () => getOpenPulls(profileId, repoId),
  });

  let { data: closedPullsData } = useQuery({
    queryKey: ["closedPulls", repoId],
    queryFn: () => getClosedPulls(profileId, repoId),
  });

  if (openPullsData && !closedPullsData) {
    closedPullsData = 0;
  } else if (!openPullsData && closedPullsData) {
    openPullsData = 0;
  }

  if (openIssuesData && !closedIssuesData) {
    closedIssuesData = 0;
  } else if (!openIssuesData && closedIssuesData) {
    openIssuesData = 0;
  }

  let { data: collabData } = useQuery({
    queryKey: ["collab", repoId],
    queryFn: () => getContributors(profileId, repoId),
  });

  let { data: commit } = useQuery({
    queryKey: ["commits", profileId, repoId],
    queryFn: () => getCommits(`${profileId}/${repoId}`),
  });

  let { data: mainData } = useQuery({
    queryKey: ["mainData", repoId],
    queryFn: () => getMain(profileId, repoId),
  });

  let dataXAxis: string[] = [];
  let dataYAxis: number[] = [];
  let startDate: string = "";
  let endDate: string = "";

  if (commit) {
    const commitsData: { [date: string]: number } = {};
    for (const item of commit) {
      const { date } = item.commit.author;
      const commitDate = new Date(date);
      const formattedCommitDate = commitDate.toISOString().substring(0, 10);

      commitsData[formattedCommitDate] =
        (commitsData[formattedCommitDate] !== undefined
          ? commitsData[formattedCommitDate]
          : 0) + 1;
    }

    for (const date in commitsData) {
      const newDate = new Date(date);
      const formattedCommitDate = `${newDate.getMonth() + 1}/${newDate.getDate()}`;
      dataXAxis.unshift(formattedCommitDate);
      dataYAxis.unshift(commitsData[date]);
    }

    endDate = Object.keys(commitsData)[0];
    startDate = Object.keys(commitsData)[Object.keys(commitsData).length - 1];

    commit = commit.slice(0, 5);
  }

  let TOTAL = 0;
  if (closedIssuesData || openIssuesData) {
    TOTAL = (openIssuesData ?? 0) + (closedIssuesData ?? 0);
  }
  const getArcLabelIssues = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  let TOTALPulls = 0;
  if (closedPullsData || openPullsData) {
    TOTALPulls = (closedPullsData ?? 0) + (openPullsData ?? 0);
  }
  const getArcLabelPulls = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTALPulls;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center p-5 gap-5 lg:p-0 cursor-default">
      <Drawer username={profileId} repo={repoId} />
      {commit ? (
        <div
          className="w-full h-full flex flex-col backdrop-blur-lg bg-off-white/30 rounded-2xl shadow-3xl py-5 flex-grow overflow-y-scroll no-scrollbar lg:m-5 lg:justify-center lg:items-center lg:absolute lg:pl-[320px] lg:pt-20 lg:backdrop-blur-0 lg:bg-transparent lg:rounded-none lg:shadow-none lg:pb-0 lg:pr-0"
          id="outerProfileContainer"
        >
          <div
            className="lg:h-full lg:w-11/12 flex flex-col items-center lg:bg-off-white/30 lg:rounded-2xl lg:shadow-3xl lg:px-8 lg:py-7 lg:flex-grow lg:overflow-y-scroll lg:no-scrollbar lg:m-5 lg:items-center lg:gap-5"
            id="InnerProfileContainer"
          >
            <div
              id="barsAndCharts"
              className="w-full flex flex-col justify-center items-center"
            >
              <div
                className={`${collabData ? "grid lg:grid-cols-2" : "flex justify-center items-center"} w-11/12 gap-10 justify-items-center`}
              >
                <div className="lg:p-4 flex flex-col justify-center items-center">
                  <h2 className="text-lg font-semibold mb-2">
                    Contributions Over Time
                  </h2>
                  <LineChart
                    width={chartWidth}
                    height={300}
                    series={[
                      {
                        data: dataYAxis,
                        area: true,
                        showMark: false,
                        color: "#4990e2",
                      },
                    ]}
                    xAxis={[{ scaleType: "point", data: dataXAxis }]}
                    sx={{
                      ".MuiLineElement-root": {
                        display: "none",
                      },
                    }}
                  />
                  <div>
                    <label className="text-sm text-lighter-text">
                      <span className="font-bold">{startDate}</span> —{" "}
                      <span className="font-bold">{endDate}</span>
                    </label>
                  </div>
                </div>
                {collabData && collabData.length > 0 && (
                  <div
                    className={`w-full bg-off-white px-5 py-3 rounded-md lg:w-[${chartWidth}px] shadow-4xl mb-5 overflow-y-scroll no-scrollbar w-5/6 self-center`}
                  >
                    <h2 className="text-lg font-semibold mb-2">Contributors</h2>
                    <ul>
                      {collabData?.map((collab: CollabItem) => (
                        <li
                          key={collab.login}
                          className="flex gap-5 items-center text-dark-text "
                        >
                          {collab.avatar_url ? (
                            <img
                              src={collab.avatar_url}
                              alt={collab.login}
                              className="rounded-full h-12 w-12"
                            />
                          ) : (
                            <div className="avatar placeholder">
                              <div className="bg-neutral text-neutral-content rounded-full h-12 w-12">
                                <span className="text-lg">
                                  {collab.login.substring(0, 1)}
                                </span>
                              </div>
                            </div>
                          )}
                          <span className="text-lg">{collab.login}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="grid lg:grid-cols-2 gap-4">
                <div className="p-4 flex flex-col justify-start items-center">
                  <h2 className="text-lg font-semibold mb-5">Issues</h2>
                  {(openIssuesData !== undefined ||
                    closedIssuesData !== undefined) &&
                  (openIssuesData !== 0 || closedIssuesData !== 0) &&
                  !(openIssuesData === 0 && closedIssuesData === 0) ? (
                    <PieChart
                      series={[
                        {
                          startAngle: 2,
                          outerRadius: 90,
                          data: [
                            {
                              id: 0,
                              value: openIssuesData, //I am aware of the typing error here, not sure how to fix it, will need advice
                              label: "Open",
                              color: "#f7a825",
                            },
                            {
                              id: 1,
                              value: closedIssuesData,
                              label: "Closed",
                              color: "#4990e2",
                            },
                          ],
                          highlightScope: {
                            faded: "global",
                            highlighted: "item",
                          },
                          faded: {
                            innerRadius: 30,
                            additionalRadius: -30,
                            color: "gray",
                          },
                          arcLabel: getArcLabelIssues,
                        },
                      ]}
                      height={200}
                      width={chartWidth - 150}
                      slotProps={{
                        legend: { hidden: true },
                      }}
                      margin={{ right: 5 }}
                    />
                  ) : (
                    <div className="h-[180px] w-[180px] bg-lighter-text/30 rounded-full flex justify-center items-center">
                      <span>No Issues</span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col justify-center items-center">
                  <h2 className="text-lg font-semibold mb-2">Pull Requests</h2>
                  {(openPullsData !== undefined ||
                    closedPullsData !== undefined) &&
                  (openPullsData !== 0 || closedPullsData !== 0) &&
                  !(openPullsData === 0 && closedPullsData === 0) ? (
                    <>
                      <PieChart
                        series={[
                          {
                            startAngle: 2,
                            outerRadius: 90,
                            data: [
                              {
                                id: 0,
                                value: openPullsData,
                                label: "Open",
                                color: "#f7a825",
                              },
                              {
                                id: 1,
                                value: closedPullsData,
                                label: "Closed",
                                color: "#4990e2",
                              },
                            ],
                            highlightScope: {
                              faded: "global",
                              highlighted: "item",
                            },
                            faded: {
                              innerRadius: 30,
                              additionalRadius: -30,
                              color: "gray",
                            },
                            arcLabel: getArcLabelPulls,
                          },
                        ]}
                        height={200}
                        width={chartWidth - 150}
                        slotProps={{
                          legend: { hidden: true },
                        }}
                        margin={{ right: 5 }}
                      />
                    </>
                  ) : (
                    <div className="h-[180px] w-[180px] bg-lighter-text/30 rounded-full flex justify-center items-center">
                      <span>No Pull Requests</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-5 mb-10">
                <div className="flex gap-2">
                  <div className="h-5 w-5 bg-secondary-orange"></div>
                  <label className="text-sm">Open</label>
                </div>
                <div className="flex gap-2">
                  <div className="h-5 w-5 bg-primary-blue"></div>
                  <label className="text-sm">Closed</label>
                </div>
              </div>
            </div>
            <div
              id="branchInfo"
              className="bg-off-white p-5 rounded-md w-11/12 shadow-4xl text-dark-text"
            >
              <div className="flex flex-col gap-2">
                {mainData && Object.keys(mainData).length !== 0 && (
                  <div className="flex flex-col mb-5">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Main Branch</h2>
                      {mainData && mainData.protected ? (
                        <div className="badge badge-outline badge-error">
                          Protected
                        </div>
                      ) : (
                        <div className="badge badge-outline badge-info">
                          Not Protected
                        </div>
                      )}
                    </div>
                    {mainData && (
                      <label className="text-sm text-lighter-text">
                        Last Updated:{" "}
                        {mainData?.commit.commit.author.date.substring(0, 10)}
                      </label>
                    )}
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    Last Activity In Repo
                  </h2>
                </div>
                {/* show the top 5 commits */}
                {commit?.map((commit: any) => (
                  <CommitItem
                    key={commit.sha}
                    commit={commit.commit}
                    sha={""}
                    parents={[]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <RepoPageLoader />
      )}
    </div>
  );
}

export default RepoPage;
