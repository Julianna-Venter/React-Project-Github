export function HeaderLoader() {
  return (
    <>
      <div className="flex items-start lg:items-center gap-10 flex-col lg:flex-row">
        <div>
          <div className="avatar absolute mr-20 lg:mr-0 h-[19rem] items-center">
            <div className="w-48 h-48 rounded-full shadow-3xl lg:w-60 lg:h-60 skeleton"></div>
          </div>
          <div className="h-[19rem] relative flex items-center">
            <div
              id="highlightsContainer"
              className="flex flex-col ml-36 lg:ml-48"
            >
              <div className="w-5 h-5 rounded-full overflow-hidden skeleton absolute -top-0 lg:w-6 lg:h-6 lg:-ml-5">
                <div className="w-full h-full flex justify-center items-center"></div>
              </div>
              <div className="w-10 h-10 ml-5 top-1 rounded-full overflow-hidden skeleton absolute lg:w-11 lg:h-11 lg:ml-3">
                <div className="w-full h-full flex justify-center items-center"></div>
              </div>
              <div className="w-14 h-14 ml-[3.125rem] rounded-full overflow-hidden skeleton lg:w-[4.5rem] lg:h-[4.5rem]">
                <div className="w-full h-full flex justify-center items-center">
                  <div className="flex flex-col justify-center items-center"></div>
                </div>
              </div>
              <div className="w-16 h-16 ml-[4.25rem] rounded-full overflow-hidden skeleton lg:w-24 lg:h-24">
                <div className="w-full h-full flex justify-center items-center">
                  <div className="flex flex-col justify-center items-center"></div>
                </div>
              </div>
              <div className="w-14 h-14 ml-[3.125rem] rounded-full overflow-hidden skeleton lg:w-[4.5rem] lg:h-[4.5rem]">
                <div className="w-full h-full flex justify-center items-center">
                  <div className="flex flex-col justify-center items-center"></div>
                </div>
              </div>
              <div className="w-10 h-10 ml-5 rounded-full overflow-hidden skeleton absolute bottom-3 lg:w-11 lg:h-11 lg:ml-3">
                <div className="w-full h-full flex justify-center items-center"></div>
              </div>
              <div className="w-5 h-5 rounded-full overflow-hidden skeleton absolute bottom-2 lg:w-6 lg:h-6 lg:-ml-5">
                <div className="w-full h-full flex justify-center items-center"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="detailsContainer flex flex-col gap-5 lg:mt-4 lg:w-5/6">
          <div className="w-40 h-5 skeleton rounded-md"></div>
          <div className="w-48 h-5 skeleton rounded-md"></div>
          <div className="flex gap-2">
            <div className="w-28 h-5 skeleton"></div>
            <div className="w-28 h-5 skeleton"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export function LanguagesLoader() {
  return (
    <div className="flex w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className=" h-5 w-48 skeleton lg:mx-20"></div>
        <div className="carousel flex gap-4 lg:justify-around lg:px-20">
          <div className="carousel-item skeleton w-20 h-20 rounded-full"></div>
          <div className="carousel-item skeleton w-20 h-20 rounded-full"></div>
          <div className="carousel-item skeleton w-20 h-20 rounded-full"></div>
          <div className="carousel-item skeleton w-20 h-20 rounded-full"></div>
          <div className="carousel-item skeleton w-20 h-20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export function CalendarLoader() {
  return <div className="skeleton w-full lg:w-[32rem] h-[8.2rem]"></div>;
}

export function RepoCardLoader() {
  return <div className="skeleton w-full lg:w-[34.2rem] h-[11.4rem]"></div>;
}

export function RepoPageLoader() {
  return (
    <div
      className="max-sm:skeleton bg-[#e8e4e4] w-full h-full flex flex-col rounded-2xl shadow-3xl py-5 flex-grow lg:m-5 lg:justify-center lg:items-center lg:absolute lg:pl-[320px] lg:pt-20 lg:backdrop-blur-0 lg:bg-transparent lg:rounded-none lg:shadow-none lg:pb-0 lg:pr-0"
      id="outerProfileContainer"
    >
      <div
        className="skeleton lg:h-full lg:w-11/12 flex flex-col lg:rounded-2xl lg:shadow-3xl lg:px-8 lg:py-7 lg:flex-grow lg:overflow-y-scroll lg:no-scrollbar lg:m-5 lg:items-center lg:gap-5"
        id="InnerProfileContainer"
      ></div>
    </div>
  );
}
