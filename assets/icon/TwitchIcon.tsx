import { IconProps } from "@/utils/types";
import React from "react";

const TwitchIcon: React.FC<IconProps> = ({
  width = 23,
  height = 27,
  ...props
}) => (
  <svg width={width} height={height} viewBox="0 0 23 27" fill="none" {...props}>
    <path
      d="M4.99997 0.5L0.357117 5.14286V21.8571H5.92855V26.5L10.5714 21.8571H14.2857L22.6428 13.5V0.5H4.99997ZM20.7857 12.5714L17.0714 16.2857H13.3571L10.1071 19.5357V16.2857H5.92855V2.35714H20.7857V12.5714Z"
      fill="#0E0E0F"
    />
    <path d="M18 5.60706H16.1428V11.1785H18V5.60706Z" fill="#0E0E0F" />
    <path
      d="M12.8928 5.60706H11.0357V11.1785H12.8928V5.60706Z"
      fill="#0E0E0F"
    />
  </svg>
);

export default TwitchIcon;
