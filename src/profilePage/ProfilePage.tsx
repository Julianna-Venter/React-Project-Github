import Calendar from "react-github-contribution-calendar";
import BackgroundAssets from "../commonComponents/BackgroundAssets";
import QuickStats from "./QuickStats";
import RepoCard from "./RepoCard";
import StatsCarousel from "./StatsCarousel";
import StatsRadial from "./StatsRadial";
import {
  monthLabelAttributes,
  panelAttributes,
  panelColors,
  until,
  values,
  weekLabelAttributes,
} from "./calendarHeatmap";

function ProfilePage() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center p-5 gap-5">
      <BackgroundAssets />
      <nav
        id="Navbar"
        className=" bg-off_white w-full h-[60px] rounded-2xl shadow-3xl flex items-center p-2.5 justify-between"
      >
        <div
          id="menuIcon"
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-dark_text"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <div
          id="labelsContainer"
          className="flex justify-center items-center gap-2 text-dark_text text-lg"
        >
          <label className="font-semibold">Users</label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.8}
            stroke="currentColor"
            className="w-4 h-4 text-ligher_text"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
          <label>julianna-venter</label>
        </div>

        {/* bookmark */}
        <div
          id="bookmarkIcon"
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6 text-dark_text"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
        </div>
        {/* this is just for future use  */}
        {/* solid bookmark */}
        {/*<div
          id="bookmarkIcon"
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle"
        >
         <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
            clipRule="evenodd"
          />
        </svg> </div>*/}
      </nav>
      <div
        className="w-full h-full flex flex-col backdrop-blur-lg bg-off_white/30 rounded-2xl shadow-3xl px-8 py-7 flex-grow overflow-y-scroll no-scrollbar"
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
            <label className="font-bold text-dark_text text-xl">
              Julianna Venter
            </label>
            <label className="text-ligher_text text-lg">julianna-venter</label>
            <p className="text-dark_text text-sm mt-2">
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
  );
}

export default ProfilePage;
