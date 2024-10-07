import { CoinIcon } from "@/assets/icon";
import React from "react";

const CoinOption: React.FC<{
  coins: number;
  price: number;
  onClick: () => void;
}> = ({ coins, price, onClick }) => (
  <div
    className="bg-[#F3F5F7] rounded-lg p-3 text-center cursor-pointer flex flex-col items-center justify-center"
    onClick={onClick}
  >
    <div className="flex justify-center items-center mb-4">
      <CoinIcon />
      <span className="ml-1 font-semibold">{coins}</span>
    </div>
    <p className="bg-[#F9C03459] w-fit text-sm py-1 px-3 rounded-lg transition-colors">
      ${price}
    </p>
  </div>
);

export default CoinOption;
