import { IconProps } from "@/utils/types";
import React from "react";

const XIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  color = "black",
  ...props
}) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M23.316 21.0014C23.6222 21.3076 23.7943 21.7229 23.7943 22.156C23.7943 22.589 23.6222 23.0044 23.316 23.3106C23.0098 23.6168 22.5945 23.7888 22.1614 23.7888C21.7284 23.7888 21.3131 23.6168 21.0069 23.3106L12.3829 14.6839L3.75614 23.3079C3.44993 23.6141 3.03462 23.7861 2.60157 23.7861C2.16852 23.7861 1.7532 23.6141 1.44699 23.3079C1.14078 23.0016 0.96875 22.5863 0.96875 22.1533C0.96875 21.7202 1.14078 21.3049 1.44699 20.9987L10.0737 12.3747L1.44971 3.74798C1.14349 3.44177 0.971467 3.02645 0.971467 2.5934C0.971467 2.16035 1.14349 1.74504 1.44971 1.43883C1.75592 1.13262 2.17123 0.960587 2.60428 0.960587C3.03733 0.960587 3.45265 1.13262 3.75886 1.43883L12.3829 10.0655L21.0096 1.43747C21.3158 1.13126 21.7311 0.959229 22.1642 0.959229C22.5972 0.959229 23.0125 1.13126 23.3187 1.43747C23.6249 1.74368 23.797 2.159 23.797 2.59205C23.797 3.0251 23.6249 3.44041 23.3187 3.74662L14.692 12.3747L23.316 21.0014Z"
      fill={color}
    />
  </svg>
);

export default XIcon;
