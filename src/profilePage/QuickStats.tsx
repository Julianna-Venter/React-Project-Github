function QuickStats() {
  return (
    <div id="highlightsContainer" className="flex flex-col ml-40">
      <div className="shadow-3xl w-[78px] h-[78px] rounded-tr-full rounded-tl-full rounded-br-full overflow-hidden rotate-[-45deg] bg-primary_blue">
        <div className="w-full h-full rotate-45 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="text-lg">59</div>
            <div className="text-sm">Commits</div>
          </div>
        </div>
      </div>

      <div className="shadow-3xl w-[84px] h-[84px] ml-20 rounded-tr-full rounded-tl-full rounded-br-full overflow-hidden rotate-45 bg-off_white">
        <div className="w-full h-full rotate-[-45deg] flex justify-center items-center">
          <div className="badge badge-primary badge-lg"></div>
        </div>
      </div>

      <div className="shadow-3xl w-[78px] h-[78px] rounded-tr-full rounded-bl-full rounded-br-full overflow-hidden rotate-45 bg-off_white">
        <div className="w-full h-full rotate-[-45deg] flex justify-center items-center">
          <div className="badge badge-primary badge-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default QuickStats;
