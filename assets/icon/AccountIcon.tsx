import { IconProps } from "@/utils/types";
import React from "react";

const AccountIcon: React.FC<IconProps> = ({
  width = 24,
  height = 25,
  color = "black",
  ...props
}) => (
  <svg width={width} height={height} viewBox="0 0 24 25" fill="none" {...props}>
    <path
      d="M9 14.5C6.23858 14.5 4 16.7386 4 19.5C4 21.1569 5.34315 22.5 7 22.5H17C18.6569 22.5 20 21.1569 20 19.5C20 16.7386 17.7614 14.5 15 14.5H9Z"
      fill={color}
      fill-opacity="0.7"
    />
    <path
      d="M12 2.5C9.23858 2.5 7 4.73858 7 7.5C7 10.2614 9.23858 12.5 12 12.5C14.7614 12.5 17 10.2614 17 7.5C17 4.73858 14.7614 2.5 12 2.5Z"
      fill={color}
      fill-opacity="0.7"
    />
  </svg>
);

export default AccountIcon;
