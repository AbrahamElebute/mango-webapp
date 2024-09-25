import SectionContainer from "@/components/Layout/SectionContainer";
import React from "react";

const CoinShop = () => {
  return (
    <SectionContainer>
      <div className="shadow-[0_5px_10px_0px] shadow-foreground/10 w-[80vw] h-[30vh]">
        <div>
          <h1> Your Balance</h1>
          <p>Transaction History</p>
        </div>
      </div>
    </SectionContainer>
  );
};

export default CoinShop;
