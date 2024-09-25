import RootLayout from "@/components/Layout/RootLayout";
import ProfileOverview from "@/components/pages/recharge/profileOverview/ProfileOverview";
import CoinShop from "@/components/pages/recharge/wallet/CoinShop";
import React from "react";

const index = () => {
  return (
    <RootLayout className="flex flex-col items-center justify-center w-full">
      <ProfileOverview />
      <CoinShop />
    </RootLayout>
  );
};

export default index;
