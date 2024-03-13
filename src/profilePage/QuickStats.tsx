function QuickStats() {
  return (
    <div id="highlightsContainer" className="flex flex-col ml-40">
      <div className="w-[78px] h-[78px] rounded-tr-full rounded-tl-full rounded-br-full overflow-hidden rotate-[-45deg] bg-primary_blue/30">
        <div className="w-full h-full rotate-45 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <span className="text-lg">59</span>
            <span className="text-sm">Commits</span>
          </div>
        </div>
      </div>

      <div className="w-[84px] h-[84px] ml-20 rounded-tr-full rounded-tl-full rounded-br-full overflow-hidden rotate-45 bg-primary_blue/30">
        <div className="w-full h-full rotate-[-45deg] flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <span className="text-lg">6</span>
            <span className="text-sm">Repos</span>
          </div>
        </div>
      </div>

      <div className="w-[78px] h-[78px] rounded-tr-full rounded-bl-full rounded-br-full overflow-hidden rotate-45 bg-primary_blue/30">
        <div className="w-full h-full rotate-[-45deg] flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <span className="text-lg">2</span>
            <span className="text-sm">Stars</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickStats;
