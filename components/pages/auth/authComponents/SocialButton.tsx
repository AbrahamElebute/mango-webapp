import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
  TiktokIcon,
  TwitchIcon,
} from "@/assets/icon";
import React from "react";

interface SocialButtonProps {
  ariaLabel?: string;
  onClick?: () => void;
}

const socialIcons = [
  { icon: <GoogleIcon />, name: "Google" },
  { icon: <TiktokIcon />, name: "TikTok" },
  { icon: <TwitchIcon />, name: "Twitch" },
  { icon: <FacebookIcon />, name: "Facebook" },
  { icon: <AppleIcon />, name: "Apple" },
];

const SocialButton: React.FC<SocialButtonProps> = ({ ariaLabel, onClick }) => {
  return (
    <div className="flex items-center justify-between ">
      {socialIcons.map(({ icon, name }, index) => (
        <button
          key={index}
          onClick={onClick}
          className="h-12 w-12 border-2 border-primary rounded-full flex items-center justify-center hover:scale-110 hover:border-foreground transition duration-300"
          aria-label={`${ariaLabel} with ${name}`}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};

export default SocialButton;
