import { CoinIcon } from "@/assets/icon";
import React from "react";

const CustomAmountInput: React.FC<{
  customAmount: string;
  purchaseRate: string;
  onChange: (value: string) => void;
}> = ({ customAmount, purchaseRate, onChange }) => (
  <form
    className="bg-gray-100 rounded-lg  p-3 text-center flex flex-col items-center justify-center"
    onSubmit={(e) => e.preventDefault()}
  >
    <div className="flex justify-center items-center mb-2">
      <CoinIcon />
      <input
        type="tel"
        value={customAmount}
        maxLength={10}
        placeholder="Enter custom amount"
        className="ml-1 w-full text-center bg-transparent border-b-2 outline-none border-gray-400"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
    <p className="bg-[#F9C03459] w-fit text-sm py-1 px-3 rounded-lg transition-colors">
      $ {customAmount ? purchaseRate : "0"}
    </p>
  </form>
);

export default CustomAmountInput;
