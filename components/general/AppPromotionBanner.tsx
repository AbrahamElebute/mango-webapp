import { ApbArrow } from "@/assets/icon";
import React from "react";

const AppPromotionBanner = () => {
  return (
    <div className="h-full p-4 flex items-center justify-center w-full  AppPromotionBanner">
      <p className="text-black text-lg flex gap-2 items-center justify-center">
        Download the app for better experience, enjoy live streaming{" "}
        <div className="w-8">
          <ApbArrow />
        </div>
      </p>
    </div>
  );
};

export default AppPromotionBanner;
