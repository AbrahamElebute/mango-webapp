import { LoadingIndicatorProps } from "@/utils/types";
import React from "react";
import SkeletonLoader from "./SkeletonLoader";

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  type = "spinner",
  size = "w-6 h-6",
  className,
}) => {
  return (
    <div
      className={`flex w-full h-full items-center justify-center ${size} ${className}`}
    >
      {type === "spinner" ? (
        <div className="animate-spin rounded-full border-4 border-gray-300 border-t-6 border-t-primary p-3"></div>
      ) : (
        <div className="w-full">
          <SkeletonLoader className="h-64" />
        </div>
      )}
    </div>
  );
};

export default LoadingIndicator;
