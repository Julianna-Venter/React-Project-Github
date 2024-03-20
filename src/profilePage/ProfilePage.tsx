import Calendar from "react-github-contribution-calendar";
import {
  monthLabelAttributes,
  panelAttributes,
  panelColors,
  until,
  values,
  weekLabelAttributes,
} from "../MockData/calendarHeatmap";
import Drawer from "../Navigation/Drawer";
import QuickStats from "./QuickStats";
import RepoCard from "./RepoCard";
import StatsCarousel from "./StatsCarousel";
import StatsRadial from "./StatsRadial";

function ProfilePage() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center p-5 gap-5 lg:p-0">
      <Drawer username={"julianna-venter"} />
      <div className="w-full h-full flex flex-col justify-center items-center lg:absolute lg:pl-[320px] lg:pt-20">
        <div
          className="w-full h-full lg:w-11/12 flex flex-col backdrop-blur-lg bg-off-white/30 rounded-2xl shadow-3xl px-8 py-7 flex-grow overflow-y-scroll no-scrollbar lg:m-5"
          id="profileContainer"
        >
          <div
            id="headerContainer"
            className="w-full pb-10 pt-8 self-start flex justify-center items-center gap-5 relative"
          >
            <div className="avatar absolute mr-20">
              <div className="w-480 h-48 rounded-full shadow-3xl">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <QuickStats />
          </div>
          <div className="detailsContainer w-full flex flex-col gap-5 mt-4">
            <div className="flex flex-col">
              <label className="font-bold text-dark-text text-xl">
                Julianna Venter
              </label>
              <label className="text-lighter-text text-lg">
                julianna-venter
              </label>
              <p className="text-dark-text text-sm mt-2">
                This is the description I am a developer and this is my github.
              </p>
            </div>
            <StatsCarousel />
            <StatsRadial />
            <Calendar
              values={values}
              until={until}
              weekLabelAttributes={weekLabelAttributes}
              monthLabelAttributes={monthLabelAttributes}
              panelAttributes={panelAttributes}
              panelColors={panelColors}
            />
            <RepoCard repoName={"This-Is-Repo-1"} />
            <RepoCard repoName={"Another-One"} />
            <RepoCard repoName={"This-is-it"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
