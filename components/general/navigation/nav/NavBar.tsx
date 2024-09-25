import React from "react";
import { Logo } from "@/assets/Logo";
import { RouteType } from "@/utils/types";
import { navRoutes } from "@/utils/variables";
import Button from "../../../ui/form/Button";
import NavBarItem from "./NavBarItem";
import AuthModal from "@/components/pages/auth/AuthModal";
import { useAuthModal } from "@/hooks/useAuthModal";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import SectionContainer from "@/components/Layout/SectionContainer";

interface NavBarProps {
  logoColor: string;
  headerStyle: string;
}

const NavBar: React.FC<NavBarProps> = ({ logoColor, headerStyle }) => {
  const { isOpen, currentScreen, openModal, closeModal, switchScreen } =
    useAuthModal();
  const { userAuthDetails, userDetails } = useUser();
  return (
    <>
      <SectionContainer
        contentContainerClassName={`${headerStyle} sticky top-0 bg-opacity-40 z-30 backdrop-filter backdrop-blur-md`}
        className={`grid items-center grid-cols-3 py-6 w-full`}
      >
        <div className="flex flex-start">
          <Logo color={logoColor} />
        </div>
        <nav className="hidden md:flex items-center justify-center">
          <ul className="flex gap-6 items-center">
            {navRoutes.map((route: RouteType, index) => (
              <NavBarItem key={index} route={route} />
            ))}
          </ul>
        </nav>

        <div className="flex justify-end">
          {userAuthDetails && (
            <div className="size-12 rounded-full bg-slate-200 overflow-hidden relative">
              {userDetails && (
                <Image
                  alt=""
                  src={userDetails?.avatar}
                  className="object-center object-cover"
                  fill
                />
              )}
            </div>
          )}

          {!userAuthDetails && (
            <Button
              className="hidden md:block"
              onClick={() => openModal("login")}
            >
              Login
            </Button>
          )}
        </div>
      </SectionContainer>

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
