import React, { useState } from "react";
import { Logo } from "@/assets/Logo";
import { navRoutes } from "@/utils/variables";
import Button from "../../../ui/form/Button";
import NavBarItem from "./NavBarItem";
import AuthModal from "@/components/pages/auth/AuthModal";
import { useAuthModal } from "@/hooks/useAuthModal";
import useUser from "@/hooks/useUser";
import SectionContainer from "@/components/Layout/SectionContainer";
import MobileMenu from "./MobileMenu";
import UserAvatar from "./UserAvatar";
import { NavBarProps } from "@/utils/types";
import { MenuCloseIcon, MenuIcon } from "@/assets/icon";
import ProfiledropDown from "../../profile/ProfiledropDown";

const NavBar: React.FC<NavBarProps> = ({
  logoColor,
  headerStyle,
  headerBtnStyle,
}) => {
  const { isOpen, currentScreen, openModal, closeModal, switchScreen } =
    useAuthModal();
  const { userAuthDetails, loadingState, userDetails } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropDown, setProfileDropDown] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileDropDown = () => setProfileDropDown(!isProfileDropDown);

  return (
    <>
      <SectionContainer
        contentContainerClassName={` ${headerStyle} sticky top-0 bg-opacity-40 z-30 backdrop-filter backdrop-blur-md`}
        className={`flex justify-between md:grid items-center grid-cols-3 py-6 w-full`}
      >
        <div className="flex flex-start">
          <Logo color={logoColor} />
        </div>
        <nav className="hidden md:flex items-center justify-center">
          <ul className="flex gap-6 items-center">
            {navRoutes.map((route, index) => (
              <NavBarItem key={index} route={route} />
            ))}
          </ul>
        </nav>

        <div className="flex justify-end items-center">
          {userAuthDetails ? (
            <div className="relative">
              <div onClick={toggleProfileDropDown}>
                <UserAvatar
                  loading={loadingState.userDetails}
                  avatar={userDetails?.avatar || ""}
                  className="md:block hidden"
                />
              </div>

              {isProfileDropDown && (
                <ProfiledropDown
                  toggleProfileDropDown={toggleProfileDropDown}
                />
              )}
            </div>
          ) : (
            <Button
              variant="default"
              className={`hidden md:block ${headerBtnStyle}   transition-none duration-0 `}
              onClick={() => openModal("login")}
            >
              Login
            </Button>
          )}

          <button
            className={`md:hidden ml-4 text-gray-600`}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <MenuCloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </SectionContainer>

      {isMobileMenuOpen && (
        <MobileMenu
          userAuthDetails={userAuthDetails}
          loadingUserDetails={loadingState.userDetails}
          userDetails={userDetails}
          toggleMobileMenu={toggleMobileMenu}
          openModal={openModal}
        />
      )}

      <AuthModal
        isOpen={isOpen}
        onClose={closeModal}
        currentScreen={currentScreen}
        switchScreen={switchScreen}
      />
    </>
  );
};

export default NavBar;
