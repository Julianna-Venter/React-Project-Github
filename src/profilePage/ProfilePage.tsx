import Calendar from "react-github-contribution-calendar";
import {
  monthLabelAttributes,
  panelAttributes,
  panelColors,
  until,
  values,
  weekLabelAttributes,
} from "../Models/calendarHeatmap";
import Drawer from "../Navigation/Drawer";
import QuickStats from "./QuickStats";
import RepoCard from "./RepoCard";
import StatsCarousel from "./StatsCarousel";
import StatsRadial from "./StatsRadial";

function ProfilePage() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center p-5 gap-5 lg:p-0">
      <Drawer username={"julianna-venter"} />
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
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <QuickStats />
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="font-bold text-dark-text text-xl">
                  Julianna Venter
                </label>
                <label className="text-lighter-text text-lg">
                  julianna-venter
                </label>
                <p className="text-dark-text text-sm mt-2">
                  This is the description I am a developer and this is my
                  github.
                </p>
              </div>
              <StatsCarousel />
            </div>
          </div>
          <div className="detailsContainer w-full flex flex-col gap-5 mt-4 lg:w-5/6">
            <StatsRadial />
            <div className="lg:pl-5">
              <Calendar
                values={values}
                until={until}
                weekLabelAttributes={weekLabelAttributes}
                monthLabelAttributes={monthLabelAttributes}
                panelAttributes={panelAttributes}
                panelColors={panelColors}
              />
            </div>

            <div className="flex flex-col gap-5 lg:px-20">
              <RepoCard repoName={"This-Is-Repo-1"} />
              <RepoCard repoName={"Another-One"} />
              <RepoCard repoName={"This-is-it"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
