import { IconProps } from "@/utils/types";
import React from "react";

const AppleIcon: React.FC<IconProps> = ({
  width = 25,
  height = 25,
  ...props
}) => (
  <svg width={width} height={height} viewBox="0 0 25 25" fill="none" {...props}>
    <g clip-path="url(#clip0_1351_225433)">
      <path
        d="M17.1864 0C15.8536 0.092187 14.2958 0.945307 13.388 2.05624C12.5599 3.06404 11.8786 4.56091 12.1443 6.01559C13.6005 6.0609 15.1052 5.18747 15.977 4.05779C16.7927 3.00623 17.4098 1.51874 17.1864 0Z"
        fill="black"
      />
      <path
        d="M22.4536 8.38749C21.1739 6.78281 19.3755 5.85156 17.6771 5.85156C15.4349 5.85156 14.4865 6.92499 12.9287 6.92499C11.3224 6.92499 10.1021 5.85469 8.16306 5.85469C6.25838 5.85469 4.23027 7.01874 2.94434 9.00936C1.13654 11.8125 1.44591 17.0827 4.37558 21.5718C5.42401 23.178 6.82401 24.9843 8.65525 24.9999C10.2849 25.0155 10.7443 23.9546 12.9521 23.9436C15.1599 23.9311 15.5786 25.014 17.2052 24.9968C19.038 24.9827 20.5146 22.9812 21.563 21.3749C22.3145 20.2234 22.5942 19.6437 23.177 18.3437C18.938 16.7296 18.2583 10.7015 22.4536 8.38749Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_1351_225433">
        <rect width="25" height="25" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default AppleIcon;
