import React from "react";
import NavBarItem from "./NavBarItem";
import { MobileMenuProps, RouteType } from "@/utils/types";
import { navRoutes } from "@/utils/variables";
import Button from "../../../ui/form/Button";
import UserAvatar from "./UserAvatar";
import { MenuCloseIcon } from "@/assets/icon";
import Modal from "@/components/ui/modal/Modal";

const MobileMenu: React.FC<MobileMenuProps> = ({
  userAuthDetails,
  loadingUserDetails,
  userDetails,
  toggleMobileMenu,
  openModal,
}) => {
  return (
    <Modal
      contentClassName="!top-0 !translate-y-[0]"
      opened={true}
      onClose={toggleMobileMenu}
    >
      <div className="p-4 h-fit w-screen bg-white">
        <button className="mb-4 text-gray-600" onClick={toggleMobileMenu}>
          <MenuCloseIcon />
        </button>
        <ul className="space-y-4">
          {userAuthDetails && (
            <div className="flex gap-4 items-center">
              <UserAvatar
                loading={loadingUserDetails}
                avatar={userDetails?.avatar}
                className="block md:hidden"
              />
              <span>
                <p className="text-2xl font-semibold">
                  {userDetails?.username}
                </p>
                <p className="text-black/50">{userDetails?.name}</p>
              </span>
            </div>
          )}
          {navRoutes.map((route: RouteType, index) => (
            <li key={index} onClick={toggleMobileMenu}>
              <NavBarItem route={route} isMoblie />
            </li>
          ))}
        </ul>
        {!userAuthDetails && (
          <Button
            className="mt-10 !p-4 w-full"
            onClick={() => {
              openModal("login");
              toggleMobileMenu();
            }}
          >
            Login
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default MobileMenu;
