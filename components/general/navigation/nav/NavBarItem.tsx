import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NavBarItemProps } from "@/utils/types";

const NavBarItem: React.FC<NavBarItemProps> = ({ route }) => {
  const router = useRouter();
  const isActive = route.activeIn.includes(router.pathname);

  return (
    <li className="relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:rounded-2xl after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-200">
      <Link
        href={route.path}
        className={isActive ? "text-primary" : "hover:text-primary"}
        aria-current={isActive ? "page" : undefined}
      >
        {route.label}
      </Link>
    </li>
  );
};

export default NavBarItem;
