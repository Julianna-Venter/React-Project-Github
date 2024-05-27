const QuickStats = ({
  repoNumber,
  starsNumber,
  commits,
}: {
  repoNumber: number | undefined;
  starsNumber: number | undefined;
  commits: number | undefined;
}) => {
  return (
    <div
      id="highlightsContainer"
      className="flex flex-col ml-36 lg:ml-48 text-sky-900 cursor-default"
    >
      <div className="w-5 h-5 rounded-full overflow-hidden bg-primary-blue/30 absolute -top-0 lg:w-6 lg:h-6 lg:-ml-5">
        <div className="w-full h-full flex justify-center items-center"></div>
      </div>
      <div className="w-10 h-10 ml-5 top-1 rounded-full overflow-hidden bg-primary-blue/30 absolute lg:w-11 lg:h-11 lg:ml-3">
        <div className="w-full h-full flex justify-center items-center"></div>
      </div>

      <div className="w-14 h-14 ml-[3.125rem] rounded-full overflow-hidden bg-primary-blue/30 lg:w-[4.5rem] lg:h-[4.5rem]">
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <span className="text-lg lg:text-xl leading-none font-semibold">
              {repoNumber}
            </span>
            <span className="text-xs lg:text-sm">
              {repoNumber && repoNumber !== 1 ? "repos" : "repo"}
            </span>
          </div>
        </div>
      </div>

      <div className="w-16 h-16 ml-[4.25rem] rounded-full overflow-hidden bg-primary-blue/30 lg:w-24 lg:h-24">
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <span className="text-lg lg:text-2xl leading-none font-semibold">
              {commits}
            </span>
            <span className="text-xs lg:text-base">
              {commits && commits !== 1 ? "commits" : "commit"}
            </span>
          </div>
        </div>
      </div>

      <div className="w-14 h-14 ml-[3.125rem] rounded-full overflow-hidden bg-primary-blue/30 lg:w-[4.5rem] lg:h-[4.5rem]">
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <span className="text-lg lg:text-xl leading-none font-semibold">
              {starsNumber}
            </span>
            <span className="text-xs lg:text-sm">
              {starsNumber && starsNumber !== 1 ? "stars" : "star"}
            </span>
          </div>
        </div>
      </div>

      <div className="w-10 h-10 ml-5 rounded-full overflow-hidden bg-primary-blue/30 absolute bottom-3 lg:w-11 lg:h-11 lg:ml-3">
        <div className="w-full h-full flex justify-center items-center"></div>
      </div>
      <div className="w-5 h-5 rounded-full overflow-hidden bg-primary-blue/30 absolute bottom-2 lg:w-6 lg:h-6 lg:-ml-5">
        <div className="w-full h-full flex justify-center items-center"></div>
      </div>
    </div>
  );
};

export default QuickStats;
