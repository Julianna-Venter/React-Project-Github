const colorPalette = {
  orange: {
    bg: "secondary_orange/40",
    border: "secondary_orange/10",
    code: "text-amber-900",
    percentage: 70,
    language: "HTML",
  },
  blue: {
    bg: "primary_blue/20",
    border: "primary_blue/10",
    code: "text-blue-950",
    percentage: 45,
    language: "TS",
  },
};

function StatsRadial() {
  return (
    <div
      id="statsContainer"
      className={`carousel flex gap-4 ${colorPalette.orange.code}`}
    >
      <div
        className={`carousel-item radial-progress bg-${colorPalette.orange.bg} text-primary-content border-4 border-${colorPalette.orange.border}`}
        style={
          {
            "--value": `${colorPalette.orange.percentage}`,
          } as React.CSSProperties
        }
        role="progressbar"
      >
        <div
          id="statsItems"
          className="flex flex-col justify-center items-center"
        >
          <label className="text-lg h-1/2">
            {colorPalette.orange.percentage}%
          </label>
          <label className=" text-xs">{colorPalette.orange.language}</label>
        </div>
      </div>
    </div>
  );
}

export default StatsRadial;
