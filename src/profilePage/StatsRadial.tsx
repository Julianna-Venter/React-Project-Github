import { hexColorsDark } from "../Models/data";
import { LanguageData } from "../Models/interfaces";
import "./Styles/radialStyles.css";
interface RadialProps {
  result: LanguageData;
  dataReady: boolean;
}

const StatsRadial: React.FC<RadialProps> = ({ result, dataReady }) => {
  function getPercentage(num: number): string {
    const total = Object.values(result).reduce((a, b) => a + b, 0);
    return ((num / total) * 100).toFixed(1);
  }

  if (!dataReady) {
    // Return loading indicator or placeholder if data is not ready
    //will be replaced with a loading spinner
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <span className="text-dark-text lg:pl-20">Top 5 Languages:</span>
      <div className="carousel flex gap-4 lg:justify-between lg:px-20">
        {Object.entries(result)
          .slice(0, 5)
          .map(([language, count], index) => {
            const color = hexColorsDark[index].color; // Get color based on index
            return (
              <div key={language} className={`text-${color}`}>
                <div
                  className={`carousel-item radial-progress bg-transparent text-primary-content border-2`}
                  style={
                    {
                      "--value": `${getPercentage(count)}`,
                      color: `${color}`,
                      "--thickness": "6px",
                    } as React.CSSProperties
                  }
                  role="progressbar"
                >
                  <div
                    id="statsItems"
                    className="flex flex-col justify-center items-center"
                  >
                    <label className="text-md h-1/2 flex items-center">
                      {getPercentage(count)}
                      <p className="text-xs opacity-80 font-bold ml-0.5">%</p>
                    </label>
                    <label className="text-xs px-5">{language}</label>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default StatsRadial;
