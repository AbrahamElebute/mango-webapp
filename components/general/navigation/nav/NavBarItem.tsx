import { RouteType } from "@/utils/types";
import Link from "next/link";
import React from "react";
interface NavBarItemProps {
  route: RouteType;
}

const NavBarItem: React.FC<NavBarItemProps> = ({ route }) => {
  return (
    <li className="relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:rounded-2xl after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300">
      <Link href={route.path}> {route.label}</Link>
    </li>
  );
};

export default NavBarItem;
