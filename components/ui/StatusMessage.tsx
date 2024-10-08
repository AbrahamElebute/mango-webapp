import { StatusMessageProps } from "@/utils/types";
import React, { useEffect } from "react";

const StatusMessage: React.FC<StatusMessageProps> = ({
  type,
  message,
  clearMessage,
  duration = 6000,
}) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, clearMessage, duration]);

  const getBackgroundColor = () => {
    switch (type) {
      case "error":
        return "bg-red-500";
      case "success":
        return "bg-green-500";
      case "info":
        return "bg-blue-500";
      default:
        return "";
    }
  };

  return (
    <div
      className={`flex items-center justify-center py-3 px-6 max-w-[90vw] md:max-w-[40vw] rounded-xl text-white ${getBackgroundColor()} transition-all duration-300 ease-in-out`}
      role="alert"
    >
      <p className="truncate">{message}</p>
    </div>
  );
};

export default StatusMessage;
