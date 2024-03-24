import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { octokit } from "../../environment/apiKey";

const StatsCarousel = ({
  followers,
  following,
  url,
}: {
  followers: number | undefined;
  following: number | undefined;
  url: string | undefined;
}) => {
  const [orgs, setOrgs] = useState<number>();

  useEffect(() => {
    getOrgs();
  });

  const getOrgs = async () => {
    if (url) {
      try {
        const res = await octokit.request(`GET ${url}`);

        if (res.status === 200) {
          let organizations = res.data.length;
          if (organizations != 0) {
            organizations -= 1;
          }
          setOrgs(organizations);
          return organizations;
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
    queryKey: ["Organizations"],
    queryFn: getOrgs,
    enabled: false,
  });
  return (
    <div id="carousel" className="carousel flex gap-4 text-dark-text">
      <div className="carousel-item">
        <div className="">
          <span>Followers</span>
          <div className="badge badge-secondary ml-1">{followers}</div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="">
          <span>Following</span>
          <div className="badge badge-secondary ml-1">{following}</div>
        </div>
      </div>
      {orgs != 0 && (
        <div className="carousel-item">
          <div className="">
            <span>Organizations</span>
            <div className="badge badge-secondary ml-1">{orgs}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCarousel;
