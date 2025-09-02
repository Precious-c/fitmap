import React from "react";

const OnboardingContent: React.FC = () => {
  return (
    <div className="font-poppins text-center h-screen w-full flex flex-col justify-end pb-20 px-6 text-white backdrop-brightness-50">
      <div className="flex flex-col justify-center items-center gap-8">
        <div className="flex flex-col">
          <h4 className=" text-3xl font-light">Welcome to</h4>
          <h2 className="font-semibold text-[40px]">Fit Map</h2>
          <p>
            Get ready to embark on a journey of real-time fitness challenges,
            social interactions and rewarding experiences.
          </p>
        </div>

        <div className="flex gap-2">
          <div className="rounded-full bg-accent w-4 h-4"></div>
          <div className="rounded-full bg-white w-4 h-4"></div>
          <div className="rounded-full bg-white w-4 h-4"></div>
        </div>

        <button className="h-[50px] w-[220px] bg-accent rounded-[20px] p-[10px] text-black font-medium text[20px]">
          Next
        </button>
      </div>
    </div>
  );
};

export default OnboardingContent;