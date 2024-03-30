import { RepoRouteParams } from "../models/interfaces";
import Drawer from "../navigation/Drawer";
import { Route } from "../routes";

function RepoPage() {
  const { profileId, repoId } = Route.useParams<RepoRouteParams>();

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center p-5 gap-5 lg:p-0">
      <Drawer username={profileId} repo={repoId} />
      <div
        className="w-full h-full flex flex-col backdrop-blur-lg bg-off-white/30 rounded-2xl shadow-3xl px-8 py-7 flex-grow overflow-y-scroll no-scrollbar lg:m-5 lg:justify-center lg:items-center lg:absolute lg:pl-[320px] lg:pt-20 lg:backdrop-blur-0 lg:bg-transparent lg:rounded-none lg:shadow-none lg:pb-0 lg:pr-0"
        id="outerProfileContainer"
      ></div>
    </div>
  );
}

export default RepoPage;
