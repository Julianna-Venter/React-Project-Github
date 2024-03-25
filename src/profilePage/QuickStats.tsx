import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { octokit } from "../../environment/apiKey";

const QuickStats = ({
  repoNumber,
  username,
  commits,
}: {
  repoNumber: number | undefined;
  username: string | undefined;
  commits: number | undefined;
}) => {
  const [stars, setStars] = useState<number>();

  useEffect(() => {
    getStats();
  });

  const getStats = async () => {
    if (username) {
      try {
        const res = await octokit.request(
          `GET https://api.github.com/users/${username}/starred`
        );

        if (res.status === 200) {
          let stars = res.data.length;
          if (stars != 0) {
            stars -= 1;
          }
          setStars(stars);
          return stars;
        } else {
          console.error("Request failed with status:", res.status);
          return;
        }
      } catch (error) {
        console.error("Error occurred:", error);
        return;
      }
    }
  };

  //tanstack/react-query hook to fetch the users
  useQuery({
    queryKey: ["Stats"],
    queryFn: getStats,
    enabled: false,
  });

  return (
    <div
      id="highlightsContainer"
      className="flex flex-col ml-36 lg:ml-48 text-sky-900"
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
            <span className="text-xs lg:text-sm">Repos</span>
          </div>
        </div>
      </div>

      <div className="w-16 h-16 ml-[4.25rem] rounded-full overflow-hidden bg-primary-blue/30 lg:w-24 lg:h-24">
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <span className="text-lg lg:text-2xl leading-none font-semibold">
              {commits}
            </span>
            <span className="text-xs lg:text-base">Commits</span>
          </div>
        </div>
      </div>

      <div className="w-14 h-14 ml-[3.125rem] rounded-full overflow-hidden bg-primary-blue/30 lg:w-[4.5rem] lg:h-[4.5rem]">
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <span className="text-lg lg:text-xl leading-none font-semibold">
              {stars}
            </span>
            <span className="text-xs lg:text-sm">Stars</span>
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
