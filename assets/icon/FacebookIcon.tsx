import { IconProps } from "@/utils/types";
import React from "react";

const FacebookIcon: React.FC<IconProps> = ({
  width = 27,
  height = 27,
  ...props
}) => (
  <svg width={width} height={height} viewBox="0 0 27 27" fill="none" {...props}>
    <g clip-path="url(#clip0_1351_225441)">
      <path
        d="M15.5135 26.5V14.641H19.4925L20.0895 10.018H15.5135V7.06691C15.5135 5.72886 15.8836 4.81699 17.8045 4.81699L20.2505 4.81599V0.680999C19.8275 0.626029 18.3755 0.5 16.6855 0.5C13.1565 0.5 10.7405 2.65406 10.7405 6.60905V10.018H6.74951V14.641H10.7405V26.5H15.5135Z"
        fill="#3D4DA6"
      />
    </g>
    <defs>
      <clipPath id="clip0_1351_225441">
        <rect
          width="26"
          height="26"
          fill="white"
          transform="translate(0.5 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default FacebookIcon;
