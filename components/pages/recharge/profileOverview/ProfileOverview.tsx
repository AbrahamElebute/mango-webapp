import SectionContainer from "@/components/Layout/SectionContainer";
import React, { useState } from "react";
import Progress from "./Progress";
import ProgressBage from "./ProgressBage";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import { CopyIcon } from "@/assets/icon";
import { toast } from "react-toastify";

const ProfileOverview = () => {
  const { userDetails, loadingUserDetails } = useUser();
  const [copySuccess, setCopySuccess] = useState<string>("");

  const copyToClipboard = (id: string) => {
    navigator.clipboard
      .writeText(`Mango ID: ${id}`)
      .then(() => {
        toast(copySuccess);
        // toast("Copied!");
      })
      .catch((err) => {
        setCopySuccess("Failed to copy!");
      });
  };

  return (
    <SectionContainer className="mt-10">
      {loadingUserDetails ? (
        <div className="w-[90vw] max-w-[500px] relative h-40 flex flex-col justify-between border-4 border-gray-200 rounded-3xl p-3">
          <span className="flex w-full gap-4">
            <SkeletonLoader className="rounded-full size-14 shrink-0" />
            <div className="w-full space-y-2">
              <SkeletonLoader className="w-1/2 h-5" />
              <SkeletonLoader className="w-1/3 h-2.5" />
            </div>
          </span>
          <SkeletonLoader className="w-full h-4" />
          <div className="flex items-center justify-between">
            <SkeletonLoader className="w-16 h-3" />
            <SkeletonLoader className="w-16 h-3 mr-10" />
          </div>
        </div>
      ) : (
        <div className="w-[90vw] max-w-[500px] relative h-40 flex flex-col justify-between border-4 border-[#BD8DF4] rounded-3xl p-3">
          <div className=" flex gap-3 items-center">
            <div className="w-14 h-14 border-2 bg-gray-200 border-[#BD8DF4] rounded-full relative overflow-hidden">
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
                    <p className="text-2xl font-medium capitalize">
                      {userDetails?.username}
                    </p>
                    <p className="text-sm lowercase">{userDetails?.name}</p>
                  </>
                )}
              </div>
              <span className="flex items-center gap-1">
                <p className="text- uppercase text-black/70 w-32 truncate">
                  id: {userDetails?.id}
                </p>
                <div
                  onClick={() => {
                    copyToClipboard(userDetails?.id || "");
                  }}
                  className="cursor-pointer"
                >
                  <CopyIcon />
                </div>
              </span>
            </span>
          </div>
          <Progress />
          <ProgressBage />
        </div>
      )}
    </SectionContainer>
  );
};

export default ProfileOverview;
