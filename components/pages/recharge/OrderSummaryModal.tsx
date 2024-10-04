import React, { useState } from "react";
import { CoinIcon } from "@/assets/icon";

const OrderSummaryModal: React.FC<{
  totalAmount: number;
  coinAmount: number;
  onClose: () => void;
}> = ({ totalAmount, coinAmount, onClose }) => {
  const [selectedPayment, setSelectedPayment] = useState("paypal");

  const paymentMethods = [
    { id: "paypal", name: "Paypal", logo: "🅿️" },
    { id: "venmo", name: "Venmo", logo: "𝕍" },
    { id: "stripe", name: "Stripe", logo: "💳" },
  ];

  return (
    <>
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Order summary</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="border-t border-b py-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total</span>
            <div className="flex items-center">
              <CoinIcon size={20} className="mr-1" />
              <span className="mr-2">{coinAmount}</span>
              <span className="text-xl font-bold">${totalAmount}</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-gray-600 mb-2">Payment Method</h3>
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-3 border rounded-lg mb-2 cursor-pointer"
              onClick={() => setSelectedPayment(method.id)}
            >
              <div className="flex items-center">
                <span className="mr-3 text-2xl">{method.logo}</span>
                <span>{method.name}</span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedPayment === method.id
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300"
                }`}
              />
            </div>
          ))}
        </div>

        <button className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
          Pay Now
        </button>
      </div>
    </>
  );
};

export default OrderSummaryModal;
