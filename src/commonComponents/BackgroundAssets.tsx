function BackgroundAssets() {
  return (
    <div className="h-screen w-screen overflow-hidden absolute -z-20 lg:ml-[100px]">
      <div className="w-[37.5rem] h-[34.375rem] bg-primary-blue absolute -z-20 rotate-45 rounded-badge left-[-18.5rem] top-[-15rem] flex-0"></div>
      <div className="w-[18.75rem] h-[9.375rem] border-solid border-12 border-secondary-orange absolute rounded-badge -z-10 left-[6rem] top-[-8rem] rotate-45 flex-0"></div>
      <div className="w-[37.5rem] h-[34.375rem] bg-primary-blue absolute -z-20 rotate-45 rounded-badge right-[-15rem] bottom-[-25rem] flex-0"></div>
      <div className="w-[18.75rem] h-[9.375rem] border-solid border-12 border-secondary-orange absolute rounded-badge -z-10 right-[-14rem] bottom-[4rem] rotate-45 flex-0"></div>
    </div>
  );
}

export default BackgroundAssets;
