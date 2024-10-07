import { CoinIcon } from "@/assets/icon";
import React from "react";

const CustomAmountInput: React.FC<{
  customAmount: string;
  purchaseRate: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}> = ({ customAmount, purchaseRate, onChange, onSubmit }) => (
  <form
    onClick={onSubmit}
    onSubmit={onSubmit}
    className="bg-gray-100 rounded-lg cursor-pointer p-3 text-center flex flex-col items-center justify-center"
  >
    <div className="flex justify-center items-center mb-2">
      <CoinIcon />
      <input
        type="tel"
        value={customAmount}
        maxLength={20}
        onChange={({ target: { value } }) => {
          if (/^\d*$/.test(value)) {
            onChange(value);
          }
        }}
        placeholder="Enter custom amount"
        className="ml-1 w-full text-center bg-transparent border-b-2 outline-none border-gray-400"
      />
    </div>
    <p className="bg-[#F9C03459] w-fit text-sm py-1 px-3 rounded-lg transition-colors">
      $ {customAmount ? purchaseRate : "0"}
    </p>
  </form>
);

export default CustomAmountInput;
