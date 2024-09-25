import { IconProps } from "@/utils/types";
import React from "react";

const EyeIcon: React.FC<IconProps> = ({
  width = 24,
  height = 25,
  color = "black",
  ...props
}) => (
  <svg width={width} height={height} viewBox="0 0 24 25" fill="none" {...props}>
    <path
      d="M3 12.1667C3 12.1667 6.33333 5.5 12.1667 5.5C18 5.5 21.3333 12.1667 21.3333 12.1667C21.3333 12.1667 18 18.8333 12.1667 18.8333C6.33333 18.8333 3 12.1667 3 12.1667Z"
      stroke={color}
      stroke-opacity="0.7"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.1665 14.6667C13.5472 14.6667 14.6665 13.5475 14.6665 12.1667C14.6665 10.786 13.5472 9.66675 12.1665 9.66675C10.7858 9.66675 9.6665 10.786 9.6665 12.1667C9.6665 13.5475 10.7858 14.6667 12.1665 14.6667Z"
      stroke={color}
      stroke-opacity="0.7"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default EyeIcon;
