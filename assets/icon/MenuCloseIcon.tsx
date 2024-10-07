import { IconProps } from "@/utils/types";
import React from "react";

const MenuCloseIcon: React.FC<IconProps> = ({
  size = 24,
  color = "black",
  ...props
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M14.6401 10.1296L9.8501 14.9216"
      stroke={color}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M14.6501 14.9281L9.8501 10.1281"
      stroke={color}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M15.822 21.4997C20.009 20.6977 21.5 18.1087 21.5 12.5347C21.5 5.59767 19.19 3.28467 12.25 3.28467C5.31 3.28467 3 5.59767 3 12.5347C3 19.4717 5.31 21.7847 12.25 21.7847"
      stroke={color}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
);

export default MenuCloseIcon;
