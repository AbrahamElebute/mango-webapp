import React from "react";
import UserAvatar from "../navigation/nav/UserAvatar";
import useUser from "@/hooks/useUser";
import useToast from "@/hooks/useToast";
import { AccountIcon, CopyIcon } from "@/assets/icon";

const ProfiledropDown: React.FC<{ toggleProfileDropDown: () => void }> = ({
  toggleProfileDropDown,
}) => {
  const { loadingUserDetails, userDetails, logoutUser } = useUser();

  const { showToast } = useToast();

  const copyToClipboard = (id: string) => {
    navigator.clipboard
      .writeText(`Mango ID: ${id}`)
      .then(() => {
        showToast(`Copied successfully!`, "success");
      })
      .catch((err) => {
        showToast("Failed to copy!", "error");
      });
  };

  return (
    <>
      <div className="absolute top-16 right-0 z-30">
        <div className="bg-white text-black overflow-hidden rounded-lg flex flex-col items-center gap-4  justify-center">
          <div className="p-6 px-12 flex flex-col items-center gap-4 ">
            <UserAvatar
              loading={loadingUserDetails}
              avatar={userDetails?.avatar || ""}
              className="h-24 w-24  border-primary cursor-default"
            />
            <p className="text-xl font-bold text-nowrap">
              {userDetails?.name || ""}
            </p>

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
          </div>

          <div className="flex items-center p-4  justify-between bg-[#DFDFE1] w-full">
            <button className="flex items-center gap-3 ">
              <AccountIcon />
              Profile
            </button>
            <span className="h-6 bg-primary w-1 rounded-full"> </span>
            <button
              onClick={() => {
                logoutUser();
              }}
              className="flex items-center gap-3"
            >
              <AccountIcon />
              Logout
            </button>
          </div>
        </div>
      </div>
      <div
        onClick={toggleProfileDropDown}
        className="h-screen w-screen fixed bg-black/15 left-0 top-0 overflow-hidden"
      ></div>
    </>
  );
};

export default ProfiledropDown;
