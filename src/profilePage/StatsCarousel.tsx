function StatsCarousel() {
  return (
    <div id="carousel" className="carousel flex gap-4 text-dark-text">
      <div className="carousel-item">
        <div className="">
          <span>Followers</span>
          <div className="badge badge-secondary ml-1">12</div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="">
          <span>Following</span>
          <div className="badge badge-secondary ml-1">331</div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="">
          <span>Organizations</span>
          <div className="badge badge-secondary ml-1">3</div>
        </div>
      </div>
    </div>
  );
}

export default StatsCarousel;
