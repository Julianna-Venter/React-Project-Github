import { colors, languages } from "../Models/data";
import "./Styles/radialStyles.css";

function StatsRadial() {
  return (
    <div className="carousel flex gap-4 lg:justify-center">
      {languages.map(({ language, percentage }, index) => {
        const color = colors[index].color; // Get color based on index
        return (
          <div key={language} className={`${color}`}>
            <div
              className={`carousel-item radial-progress bg-transparent text-primary-content border-2`}
              style={
                {
                  "--value": `${percentage}`,
                } as React.CSSProperties
              }
              role="progressbar"
            >
              <div
                id="statsItems"
                className="flex flex-col justify-center items-center"
              >
                <label className="text-lg h-1/2">{percentage}%</label>
                <label className=" text-xs">{language}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsRadial;
