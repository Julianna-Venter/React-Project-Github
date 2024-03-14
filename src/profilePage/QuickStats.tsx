function QuickStats() {
  return (
    <div id="highlightsContainer" className="flex flex-col ml-32">
      <div
        className="w-5 h-5 rounded-full overflow-hidden bg-primary_blue/30 absolute -top-0
      2"
      >
        <div className="w-full h-full flex justify-center items-center"></div>
      </div>
      <div className="w-10 h-10 ml-5 top-1 rounded-full overflow-hidden bg-primary_blue/30 absolute s">
        <div className="w-full h-full flex justify-center items-center"></div>
      </div>

      <div className="w-14 h-14 ml-[3.125rem] rounded-full overflow-hidden bg-primary_blue/30">
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <span className="text-lg">59</span>
            <span className="text-xs">Commits</span>
          </div>
        </div>
      </div>

      <div className="w-16 h-16 ml-[4.25rem] rounded-full overflow-hidden bg-primary_blue/30">
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <span className="text-lg">6</span>
            <span className="text-sm">Repos</span>
          </div>
        </div>
      </div>

      <div className="w-14 h-14 ml-[3.125rem] rounded-full overflow-hidden bg-primary_blue/30">
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <span className="text-lg">2</span>
            <span className="text-sm">Stars</span>
          </div>
        </div>
      </div>

      <div className="w-10 h-10 ml-5 rounded-full overflow-hidden bg-primary_blue/30 absolute bottom-3">
        <div className="w-full h-full flex justify-center items-center"></div>
      </div>
      <div className="w-5 h-5 rounded-full overflow-hidden bg-primary_blue/30 absolute bottom-2">
        <div className="w-full h-full flex justify-center items-center"></div>
      </div>
    </div>
  );
}

export default QuickStats;
