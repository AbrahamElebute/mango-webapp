import { IconProps } from "@/utils/types";
import React from "react";

const MenuIcon: React.FC<IconProps> = ({
  size = 24,
  color = "black",
  ...props
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3 6.5C3 3.87479 3.02811 3 6.5 3C9.97189 3 10 3.87479 10 6.5C10 9.12521 10.0111 10 6.5 10C2.98893 10 3 9.12521 3 6.5Z"
      stroke={color}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M17.5 10C21.0111 10 21 9.12521 21 6.5C21 3.87479 20.9719 3 17.5 3C14.0281 3 14 3.87479 14 6.5C14 7.83097 13.9972 8.712 14.4519 9.25721"
      stroke={color}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M6.5 14C3.02811 14 3 14.8748 3 17.5C3 20.1252 2.98893 21 6.5 21C10.0111 21 10 20.1252 10 17.5C10 16.361 9.99471 15.5515 9.70516 15"
      stroke={color}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14 17.5C14 14.8748 14.0281 14 17.5 14C20.9719 14 21 14.8748 21 17.5C21 20.1252 21.0111 21 17.5 21C13.9889 21 14 20.1252 14 17.5Z"
      stroke={color}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
);

export default MenuIcon;
