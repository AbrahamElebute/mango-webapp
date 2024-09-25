import { ApbArrow } from "@/assets/icon";
import React from "react";

const AppPromotionBanner = () => {
  return (
    <div className="h-full p-4 flex items-center justify-center w-full bg-gradient-to-r from-[#FEECFF] via-[#FECAFF] via-[#FEB5FF] via-[#FFDBE7] via-[#FFF4D6] via-[#F3FCD7] via-[#D2F5EE] via-[#C3EFFF] to-[#FBEFFF]">
      <p className="text-black text-lg flex gap-2 items-center justify-center">
        Download the app for better experience, enjoy live streaming{" "}
        <ApbArrow />
      </p>
    </div>
  );
};

export default AppPromotionBanner;
