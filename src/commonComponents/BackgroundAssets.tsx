function BackgroundAssets() {
  return (
    <div className="h-screen w-screen overflow-hidden absolute -z-20">
      <div className="w-[600px] h-[550px] bg-primary_blue absolute -z-20 rotate-45 rounded-badge left-[-18.5rem] top-[-15rem] flex-0"></div>
      <div className="w-[300px] h-[150px] border-solid border-12 border-secondary_orange absolute rounded-badge -z-10 left-[6rem] top-[-8rem] rotate-45 flex-0"></div>
      <div className="w-[600px] h-[550px] bg-primary_blue absolute -z-20 rotate-45 rounded-badge right-[-15rem] bottom-[-25rem] flex-0"></div>
      <div className="w-[300px] h-[150px] border-solid border-12 border-secondary_orange absolute rounded-badge -z-10 right-[-14rem] bottom-[4rem] rotate-45 flex-0"></div>
    </div>
  );
}

export default BackgroundAssets;
