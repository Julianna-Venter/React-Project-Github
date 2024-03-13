function StatsRadial() {
  return (
    <div id="statsContainer" className="carousel flex gap-4 text-off_white">
      <div
        className="carousel-item radial-progress bg-secondary_orange text-primary-content border-4 border-secondary_orange"
        style={{ "--value": 70 } as React.CSSProperties}
        role="progressbar"
      >
        <div
          id="statsItems"
          className="flex flex-col justify-center items-center"
        >
          <label className="text-lg h-1/2">70%</label>
          <label className=" text-xs">HTML</label>
        </div>
      </div>
    </div>
  );
}

export default StatsRadial;
