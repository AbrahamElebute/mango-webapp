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
      className={`relative  min-h-[550px] w-[850px] bg-white text-black rounded-2xl gap-5 grid grid-cols-1 md:grid-cols-2 p-5 ${className} border-[#DFDFE1] border-[8px] m-8`}
    >
      <div
        className="absolute cursor-pointer right-2 top-2 z-40 p-3 rounded-full bg-gray-200/50"
        onClick={onClose}
      >
        <XIcon />
      </div>
      <div className="flex w-full items-center justify-center">{children}</div>
      <div className="relative w-full h-full hidden md:block">
        <Image
          src={AuthImage}
          alt={"Login Image"}
          className="object-cover rounded-2xl"
          layout="fill"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
