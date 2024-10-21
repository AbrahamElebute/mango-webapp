import React from "react";
import UserAvatar from "../navigation/nav/UserAvatar";
import useUser from "@/hooks/useUser";
import useToast from "@/hooks/useToast";
import { AccountIcon, CopyIcon, LogoutIcon } from "@/assets/icon";
import Modal from "@/components/ui/modal/Modal";
import { Routes } from "@/utils/variables";
import { useRouter } from "next/router";
import LoadingIndicator from "@/components/ui/LoadingIndicator";

const ProfiledropDown: React.FC<{ toggleProfileDropDown: () => void }> = ({
  toggleProfileDropDown,
}) => {
  const { loadingState, userDetails, logoutUser } = useUser();

  const { showToast } = useToast();
  const router = useRouter();

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
    <Modal
      bgClassname={"!bg-opacity-0 !backdrop-blur-[0px]"}
      opened={true}
      onClose={toggleProfileDropDown}
      dialogEnterTransition=""
      dialogEnterToAnimation=""
      dialogEnterFromAnimation=""
      contentClassName="transition-none"
    >
      <div
        className="max-w-[1550px] mx-auto h-svh w-svw relative"
        onClick={toggleProfileDropDown}
      >
        <div
          className="absolute top-16 right-10 z-30"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white text-black overflow-hidden rounded-lg flex flex-col items-center gap-4  justify-center shadow-xl">
            <div className="p-6 px-12 flex flex-col items-center gap-4 ">
              <UserAvatar
                loading={loadingState.userDetails}
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

            <div className="grid grid-cols-3 p-4  bg-[#DFDFE1] w-full">
              <div className="flex items-center justify-center">
                <button
                  onClick={() => {
                    router.push(Routes.Profile.path);
                    toggleProfileDropDown();
                  }}
                  className="flex items-center gap-3 "
                >
                  <AccountIcon />
                  Profile
                </button>
              </div>
              <div className="flex items-center justify-center">
                <span className="h-8 bg-primary w-[2px] block rounded-full"></span>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => {
                    logoutUser();
                  }}
                  className="flex  items-center justify-center gap-3"
                >
                  {loadingState.userLogout ? (
                    <LoadingIndicator type="spinner" size="w-6 h-6" />
                  ) : (
                    <>
                      <LogoutIcon />
                      Logout
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProfiledropDown;
