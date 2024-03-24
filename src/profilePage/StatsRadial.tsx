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
    <div className="carousel flex gap-4 lg:justify-center">
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
                    <p className="text-xs opacity-80 font-bold">%</p>
                  </label>
                  <label className=" text-xs">{language}</label>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default StatsRadial;
