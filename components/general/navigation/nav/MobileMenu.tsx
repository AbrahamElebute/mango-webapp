import React from "react";
import NavBarItem from "./NavBarItem";
import { RouteType } from "@/utils/types";
import { navRoutes } from "@/utils/variables";
import Button from "../../../ui/form/Button";
import UserAvatar from "./UserAvatar";
import { MenuCloseIcon } from "@/assets/icon";

interface MobileMenuProps {
  userAuthDetails: any;
  loadingUserDetails: boolean;
  userDetails: any;
  toggleMobileMenu: () => void;
  openModal: any;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  userAuthDetails,
  loadingUserDetails,
  userDetails,
  toggleMobileMenu,
  openModal,
}) => {
  return (
    <div className="md:hidden  fixed inset-0 z-40 bg-black/50  ">
      <div className="p-4 h-[50vh] bg-white">
        <button className="mb-4 text-gray-600" onClick={toggleMobileMenu}>
          <MenuCloseIcon />
        </button>
        <ul className="space-y-4">
          <div className="flex gap-4 items-center">
            <UserAvatar
              loading={loadingUserDetails}
              avatar={userDetails?.avatar}
              className="block md:hidden"
            />
            <span>
              <p className="text-2xl font-semibold">{userDetails?.username}</p>
              <p className="text-black/50">{userDetails?.name}</p>
            </span>
          </div>
          {navRoutes.map((route: RouteType, index) => (
            <li key={index} onClick={toggleMobileMenu}>
              <NavBarItem route={route} />
            </li>
          ))}
        </ul>
        {!userAuthDetails && (
          <Button
            className="mt-6 w-full"
            onClick={() => {
              openModal("login");
              toggleMobileMenu();
            }}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
