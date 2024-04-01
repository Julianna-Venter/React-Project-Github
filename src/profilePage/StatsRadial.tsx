import { hexColorsDark } from "../models/data";
import { LanguageData } from "../models/interfaces";
import "./Styles/radialStyles.css";
interface RadialProps {
  result: LanguageData[];
}

const StatsRadial: React.FC<RadialProps> = ({ result }) => {
  function getPercentage(num: number): string {
    if (result.length === 0) return "0";
    const total = result.reduce((acc, data) => {
      const totalCount = Object.values(data).reduce((a, b) => a + b, 0);
      return acc + totalCount;
    }, 0);
    return ((num / total) * 100).toFixed(1);
  }

  return (
    <div className="flex flex-col gap-4">
      <span className="text-dark-text lg:pl-20">Top 5 Languages:</span>
      <div className="carousel flex gap-4 lg:justify-between lg:px-20">
        {Object.entries(result)
          .slice(0, 5)
          .map(([language, data], index) => {
            const count = data[Object.keys(data)[0]];
            const languages = Object.keys(data)[0];
            const color = hexColorsDark[index].color;
            return (
              <div key={language} className={`text-${color}`}>
                <div
                  aria-label="radial-progress"
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
                    <label className="text-xs px-5">{languages}</label>
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
