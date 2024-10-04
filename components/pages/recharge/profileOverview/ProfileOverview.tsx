import SectionContainer from "@/components/Layout/SectionContainer";
import React from "react";
import Progress from "./Progress";
import ProgressBage from "./ProgressBage";
import useUser from "@/hooks/useUser";
import Image from "next/image";

const ProfileOverview = () => {
  const { userDetails } = useUser();
  return (
    <SectionContainer className="mt-10">
      <div className="w-[500px] relative h-40 flex flex-col justify-between border-4 border-[#BD8DF4] rounded-3xl p-3">
        <div className=" flex gap-3 items-center">
          <div className="w-14 h-14 border-2 border-[#BD8DF4] rounded-full relative overflow-hidden">
            {userDetails && (
              <Image
                alt=""
                src={userDetails?.avatar}
                className="object-center object-cover"
                fill
              />
            )}
          </div>
          <span>
            <div className="flex items-center gap-2">
              {userDetails && (
                <>
                  <p className="text-2xl font-medium">
                    {userDetails?.username}
                  </p>
                  <p className="text-sm">{userDetails?.name}</p>
                </>
              )}
            </div>
            <p className="text-sm text-slate-500">id: {userDetails?.id}</p>
          </span>
        </div>
        <Progress />
        <ProgressBage />
      </div>
    </SectionContainer>
  );
};

export default ProfileOverview;
