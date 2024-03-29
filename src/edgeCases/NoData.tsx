import { Link } from "@tanstack/react-router";

function NoData() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center py-5 gap-5 lg:p-0">
      <div
        className="h-full w-11/12 flex flex-col backdrop-blur-lg bg-off-white/30 rounded-2xl shadow-3xl lg:px-8 lg:py-7 flex-grow overflow-hidden lg:m-5 items-center lg:justify-end justify-start"
        id="InnerProfileContainer"
      >
        <span className="text-gradient text-[10rem] lg:text-[28rem] font-extrabold absolute top-0 lg:-top-24 -z-10 hidden lg:block">
          404
        </span>

        <div className="text-dark-text flex flex-col lg:w-1/2 m-12 lg:m-0">
          <span className="text-primary-blue/70 text-[10rem] lg:text-[28rem] font-extrabold lg:-top-24 -z-10 lg:hidden">
            404
          </span>
          <h1 className="lg:text-[3rem] text-[2rem]">
            Looks like the user you requested has no data yet!
          </h1>
          <h2 className="lg:text-[1.4rem] text-[1.2rem]">
            Sorry about that! Please go back to the homepage and try again.
          </h2>
          <Link
            to="/"
            className="text-lg bg-secondary-orange w-fit px-2 py-1 rounded-lg text-white mt-10 self-end"
          >
            Go Home
          </Link>
          <div className="lg:h-[25rem] lg:w-[25rem] h-[14rem] w-[14rem]">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2642/2642257.png"
              alt="Error"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoData;
