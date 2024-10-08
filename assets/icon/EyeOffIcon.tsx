import { IconProps } from "@/utils/types";
import React from "react";

const EyeOffIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = "black",
  ...props
}) => (
  <svg width={width} height={height} viewBox="0 0 21 19" fill="none" {...props}>
    {/* <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
    <path
      d="M2.55309 13.2257C1.56909 12.0467 0.996094 10.7207 0.996094 9.50374C0.996094 6.22373 5.13608 2.20373 10.2461 2.20373C12.3361 2.20373 14.2761 2.87373 15.8361 3.91373M18.0962 5.97326C18.9872 7.10326 19.5062 8.35324 19.5062 9.50324C19.5062 12.7832 15.3562 16.8032 10.2462 16.8032C9.33619 16.8032 8.44719 16.6732 7.6162 16.4432M8.01219 11.7303C7.41717 11.1413 7.08417 10.3383 7.08717 9.50134C7.08317 7.75634 8.49519 6.33832 10.2412 6.33532M13.3563 10.0623C13.1223 11.3543 12.1113 12.3673 10.8193 12.6043M18.1383 1.61328L2.36425 17.3872"
      stroke="black"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default EyeOffIcon;
