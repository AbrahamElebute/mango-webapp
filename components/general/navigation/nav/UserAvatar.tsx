import React from "react";
import Image from "next/image";
import { UserAvatarProps } from "@/utils/types";
import SkeletonLoader from "@/components/ui/SkeletonLoader";

const UserAvatar: React.FC<UserAvatarProps> = ({
  loading,
  avatar,
  className,
}) => {
  return (
    <>
      {loading ? (
        <SkeletonLoader className="rounded-full size-12" />
      ) : (
        <div
          className={`cursor-pointer border-2  hover:border-primary size-12 block rounded-full bg-slate-200 overflow-hidden relative ${className}`}
        >
          {avatar && (
            <Image
              alt={`${avatar} image`}
              src={avatar}
              className="object-center object-cover"
              fill
            />
          )}
        </div>
      )}
    </>
  );
};

export default UserAvatar;
