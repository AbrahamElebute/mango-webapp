import { XIcon } from "@/assets/icon";
import Image, { StaticImageData } from "next/image";
import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
  onClose: () => void;
  AuthImage: StaticImageData;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  className,
  onClose,
  AuthImage,
}) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 relative w-screen min-h-[550px] md:w-[850px] bg-white text-black rounded-2xl gap-5 md:p-5 ${className} border-[#DFDFE1] border-[8px] md:m-8`}
    >
      <div
        className="absolute md:hidden cursor-pointer right-2 top-2 z-40 p-3 rounded-full bg-gray-200/50"
        onClick={onClose}
      >
        <XIcon />
      </div>
      <div className="flex w-full items-center justify-center">{children}</div>
      <div className="relative w-full bg-slate-100  rounded-2xl overflow-hidden h-full hidden md:block">
        <Image
          src={AuthImage}
          alt={`${AuthImage} place-holder`}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </div>
  );
};

export default AuthLayout;
