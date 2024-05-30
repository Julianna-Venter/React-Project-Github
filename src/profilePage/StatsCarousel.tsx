const StatsCarousel = ({
  followers,
  following,
}: {
  followers: number | undefined;
  following: number | undefined;
}) => {
  return (
    <div
      id="carousel"
      className="carousel flex gap-4 text-dark-text cursor-default"
    >
      <div className="carousel-item">
        <div className="">
          <span>Followers</span>
          <div className="badge badge-outline ml-1">{followers}</div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="">
          <span>Following</span>
          <div className="badge badge-outline ml-1">{following}</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCarousel;
