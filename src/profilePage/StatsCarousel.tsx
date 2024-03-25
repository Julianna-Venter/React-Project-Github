import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getOrgs } from "./Api/profileApi";

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
    getOrgs(url, setOrgs);
  });

  //tanstack/react-query hook to fetch the users
  useQuery({
    queryKey: ["Organizations"],
    queryFn: () => getOrgs(url, setOrgs),
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
