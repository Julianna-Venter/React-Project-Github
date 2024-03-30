import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";

import { RepoRouteParams } from "../models/interfaces";
import Drawer from "../navigation/Drawer";
import { Route } from "../routes";
import CommitItem from "./commitItem";
import {
  chartSetting,
  data,
  dataset,
  valueFormatter,
} from "./services/repoData";

function RepoPage() {
  const { profileId, repoId } = Route.useParams<RepoRouteParams>();

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center p-5 gap-5 lg:p-0">
      <Drawer username={profileId} repo={repoId} />
      <div
        className="w-full h-full flex flex-col backdrop-blur-lg bg-off-white/30 rounded-2xl shadow-3xl px-8 py-7 flex-grow overflow-y-scroll no-scrollbar lg:m-5 lg:justify-center lg:items-center lg:absolute lg:pl-[320px] lg:pt-20 lg:backdrop-blur-0 lg:bg-transparent lg:rounded-none lg:shadow-none lg:pb-0 lg:pr-0"
        id="outerProfileContainer"
      >
        <div
          className="lg:h-full lg:w-11/12 lg:flex lg:flex-col lg:backdrop-blur-lg lg:bg-off-white/30 lg:rounded-2xl lg:shadow-3xl lg:px-8 lg:py-7 lg:flex-grow lg:overflow-y-scroll lg:no-scrollbar lg:m-5 lg:items-center lg:gap-5"
          id="InnerProfileContainer"
        >
          <div id="barsAndCharts">
            <label>commits over time</label>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                  area: true,
                },
              ]}
              width={500}
              height={300}
            />
            <label>Contributors</label>
            <BarChart
              dataset={dataset}
              yAxis={[{ scaleType: "band", dataKey: "month" }]}
              series={[
                { dataKey: "seoul", label: "Seoul rainfall", valueFormatter },
              ]}
              layout="horizontal"
              {...chartSetting}
            />
            <label>Open vs Closed issues</label>
            <PieChart
              series={[
                {
                  data,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              height={200}
            />
            <label>Open vs closed pull requests</label>
            <PieChart
              series={[
                {
                  data,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              height={200}
            />
          </div>
          <div id="branchInfo">
            <label>Last Updated Branch</label>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span>Branch Name</span>
                <span>Protected</span>
              </div>
              <div className="flex justify-between items-center">
                <span>main</span>
                <span>Yes</span>
              </div>
              <label>Last Updated</label>
              {/* show the top 5 commits */}
              <CommitItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepoPage;
