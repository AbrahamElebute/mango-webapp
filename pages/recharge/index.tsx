import RootLayout from "@/components/Layout/RootLayout";
import BalanceTopUp from "@/components/pages/recharge/balanceTopUp/BalanceTopUp";
import ProfileOverview from "@/components/pages/recharge/profileOverview/ProfileOverview";
import React from "react";

const index = () => {
  return (
    <RootLayout className="flex flex-col gap-10 items-center justify-center w-full">
      <ProfileOverview />
      <BalanceTopUp />
    </RootLayout>
  );
};

export default index;
