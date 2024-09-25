import SectionContainer from "@/components/Layout/SectionContainer";
import React from "react";
import Progress from "./Progress";
import ProgressBage from "./ProgressBage";

const ProfileOverview = () => {
  return (
    <SectionContainer className="mt-10">
      <div className="w-[500px] relative h-40 flex flex-col justify-between border-4 border-[#BD8DF4] rounded-3xl p-3">
        <div className=" flex gap-3 items-center">
          <div className="w-14 h-14 border-2 border-[#BD8DF4] rounded-full">
            2
          </div>
          <span>
            <p>🦊 LLOUISE DNLO 🦊</p>
            <p>id: 01251421</p>
          </span>
        </div>
        <Progress />
        <ProgressBage />
      </div>
    </SectionContainer>
  );
};

export default ProfileOverview;
