import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NavBarItemProps } from "@/utils/types";

const NavBarItem: React.FC<NavBarItemProps> = ({ route, isMoblie }) => {
  const router = useRouter();
  const isActive = route.activeIn.includes(router.pathname);

  return (
    <Link
      href={route.path}
      className={`${isActive ? "text-primary" : "hover:text-primary"} ${
        isMoblie ? "text-xl " : ""
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <li
        className={`${
          isMoblie
            ? " bg-red-30 w-full flex items-center justify-center p-4  bg-slate-50/50 hover:bg-slate-100"
            : " after:block after:content-[''] after:absolute after:h-[2px] after:rounded-2xl after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-200"
        } relative text-xl w-fit block `}
      >
        {route.label}
      </li>
    </Link>
  );
};

export default NavBarItem;
