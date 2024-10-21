import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NavBarItemProps } from "@/utils/types";
import DownloadAppModal from "../../DownloadAppModal";

const NavBarItem: React.FC<NavBarItemProps> = ({ route, isMoblie }) => {
  const router = useRouter();
  const isActive = route.activeIn.includes(router.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const baseClasses = `${isActive ? "text-primary" : "hover:text-primary"} ${
    isMoblie ? "text-xl" : "relative text-xl w-fit block"
  }`;

  const buttonStyles = isMoblie
    ? "w-full flex items-center justify-center p-4 bg-slate-50/50 hover:bg-slate-100"
    : "after:block after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-200";

  return (
    <>
      {route.type === "button" ? (
        <button
          className={`${baseClasses} ${buttonStyles}`}
          aria-label={route.label}
          onClick={() => {
            if (route.label === "App") {
              toggleMenu();
            }
          }}
        >
          {route.label}
        </button>
      ) : (
        <Link
          href={route.path}
          className={baseClasses}
          aria-current={isActive ? "page" : undefined}
        >
          <span className={buttonStyles}>{route.label}</span>
        </Link>
      )}

      {isMenuOpen && (
        <DownloadAppModal toggleMenu={toggleMenu} openModal={isMenuOpen} />
      )}
    </>
  );
};

export default NavBarItem;
