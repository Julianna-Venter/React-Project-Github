import BackgroundAssets from "../commonComponents/BackgroundAssets";

function ProfilePage() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center p-5 gap-5">
      <BackgroundAssets />
      <div className=" bg-off_white w-full h-[100px] rounded-2xl shadow-3xl"></div>
      <div
        className="flex flex-col backdrop-blur-lg bg-off_white/30 w-full h-full rounded-2xl shadow-3xl px-8 py-7 justify-around overflow-hidden lg:w-3/5 flex-grow"
        id="profileContainer"
      ></div>
    </div>
  );
}

export default ProfilePage;
