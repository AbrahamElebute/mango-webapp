import React, { useState } from "react";
import { CoinIcon, XIcon } from "@/assets/icon";
import { useModal } from "@/context/ModalContext";
import ProgressBage from "./profileOverview/ProgressBage";
import StripeModal from "./balanceTopUp/paymentModal/StripeModal";
import { PayPalSvg, StripeSvg } from "@/assets/images";
import Image from "next/image";
import Button from "@/components/ui/form/Button";
import { postData } from "@/api";
import useToast from "@/hooks/useToast";

const OrderSummaryModal: React.FC<{
  totalAmount: number;
  coinAmount: number;
  onClose: () => void;
}> = ({ totalAmount, coinAmount, onClose }) => {
  const [selectedPayment, setSelectedPayment] = useState("stripe");
  const { openModal } = useModal();
  const { showToast } = useToast();

  const paymentMethods = [
    { id: "stripe", name: "Stripe", logo: StripeSvg },
    { id: "paypal", name: "Paypal", logo: PayPalSvg },
  ];

  let paymentModal;

  switch (selectedPayment) {
    case "paypal":
      paymentModal = "paypal";
      break;
    case "stripe":
      paymentModal = (
        <StripeModal rechargeAmonut={{ totalAmount, coinAmount }} />
      );
      break;
    default:
      paymentModal = <ProgressBage />;
  }
  const payPaymentModal = async () => {
    const data = {
      amount: totalAmount,
    };
    try {
      const responseData = await postData("/wallet/fund/paypal", data);
      const goToLink = responseData.data.payment_url;
      showToast(
        responseData.data.message || "Paypal checkout created successful."
      );
      window.open(goToLink, "_self");
      return;
    } catch (error: any) {
      showToast(error?.message || "Failed. Please try again.");
    }
    onClose();
  };

  const handleModal = () => {
    if (paymentModal === "paypal") {
      payPaymentModal();
      return;
    }
    openModal(paymentModal);
  };

  return (
    <>
      <div className="bg-white rounded-lg p-6 w-[50vw]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Order summary</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon height={12} />
          </button>
        </div>

        <div className="border-t border-b py-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-xl">Total</span>
            <div className="flex items-end gap-4">
              <div className="flex items-center gap-1">
                <CoinIcon size={12} />
                <span>{coinAmount}</span>
              </div>
              <span className="text-3xl font-bold text-primary">
                ${totalAmount}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-gray-600 mb-2">Payment Method</h3>
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-3 border rounded-lg mb-2 cursor-pointer bg-[#F3F5F7]"
              onClick={() => setSelectedPayment(method.id)}
            >
              <div className="flex items-center">
                <span className="mr-3 text-2xl">
                  <Image src={method.logo} alt=" " />
                </span>
                <span>{method.name}</span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 grid place-content-center ${
                  selectedPayment === method.id
                    ? "border-primary"
                    : "border-gray-300"
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full bg-primary ${
                    selectedPayment === method.id ? "block" : "hidden"
                  } `}
                ></span>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={handleModal} variant="primary" className="w-full">
          Pay Now
        </Button>
      </div>
    </>
  );
};

export default OrderSummaryModal;
