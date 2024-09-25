import React from "react";

export const ProgressBar = () => {
  return (
    <span className="w-full h-2 rounded-3xl block bg-[#D9D1C2] relative">
      <span className="block h-10 absolute w-10 rounded-full right-0 top-[50%] translate-y-[-50%] border-background border-2 bg-[#BD8DF4]"></span>

      <span className="bg-[#BD8DF4] block rounded-3xl w-[50%] h-full"></span>
    </span>
  );
};

const Progress = () => {
  return (
    <div className="w-full flex flex-col justify-between gap-3">
      <ProgressBar />
      <div className="flex justify-between w-[90%]">
        <p>Lv.1</p>
        <p>EXP 3350/5000</p>
      </div>
    </div>
  );
};

export default Progress;
