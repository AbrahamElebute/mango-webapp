import React, { useState, useCallback, useMemo, useEffect } from "react";
import { CoinIcon, FileInvoiceDollar } from "@/assets/icon";
import Button from "@/components/ui/form/Button";
import Modal from "@/components/ui/modal/Modal";
import OrderSummaryModal from "../OrderSummaryModal";
import TransactionHistoryModal from "../TransactionHistoryModal";
import { useUserContext } from "@/context/UserContext";
import useUser from "@/hooks/useUser";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import CoinOption from "./CoinOption";
import CustomAmountInput from "./CustomAmountInput";
import { RechargeOptionProps } from "@/utils/types";
import { useModal } from "@/context/ModalContext";

const BalanceTopUp: React.FC = () => {
  const [customAmount, setCustomAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [selectedCoins, setSelectedCoins] = useState(0);
  const { userWallet } = useUserContext();
  const { getUserWallet, loadingUserWallet } = useUser();

  const { openModal, closeModal } = useModal();

  useEffect(() => {
    getUserWallet();
  }, [getUserWallet]);

  const isRechargeDisabled = useMemo(() => totalAmount === "", [totalAmount]);

  const handleOptionSelect = useCallback((coins: number, price: number) => {
    setTotalAmount(price.toString());
    setSelectedCoins(coins);
    setCustomAmount("");
  }, []);
  const purchaseRate = userWallet?.purchase_rate || 0;

  const handleCustomAmountSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (customAmount) {
        const calculatedPrice = (
          parseInt(customAmount, 10) * purchaseRate
        ).toFixed(2);
        setTotalAmount(calculatedPrice);
        setSelectedCoins(parseInt(customAmount, 10));
      }
    },
    [customAmount, purchaseRate]
  );

  const rechargeOptions: RechargeOptionProps[] = [
    { coins: 69, price: 69 * purchaseRate },
    { coins: 139, price: 139 * purchaseRate },
    { coins: 349, price: 349 * purchaseRate },
    { coins: 1469, price: 1469 * purchaseRate },
    { coins: 3429, price: 3429 * purchaseRate },
    { coins: 6999, price: 6999 * purchaseRate },
    { coins: 8439, price: 8439 * purchaseRate },
  ];

  const handleRechargeClick = () => {
    openModal(
      <OrderSummaryModal
        totalAmount={parseFloat(totalAmount)}
        coinAmount={selectedCoins}
        onClose={closeModal}
      />
    );
  };

  const handleTransactionHistoryClick = () => {
    openModal(<TransactionHistoryModal onClose={closeModal} />);
  };

  return (
    <>
      {loadingUserWallet ? (
        <SkeletonLoader className="w-full max-w-4xl h-[400px] rounded-xl m-10" />
      ) : (
        <div className="w-full max-w-4xl mx-auto p-6">
          <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
            <div className="flex justify-between text-sm">
              <h1 className="font-semibold">Your Balance</h1>
              <p
                onClick={handleTransactionHistoryClick}
                className="text-gray-600 flex items-center gap-1 cursor-pointer hover:text-gray-800"
              >
                <FileInvoiceDollar size={16} />
                Transaction History
              </p>
            </div>

            <p className="flex items-center gap-2 text-2xl font-semibold">
              <CoinIcon size={28} color="gold" />
              {userWallet?.balance.whole || "0"}
            </p>

            <div>
              <p className="font-semibold mb-3">Recharge</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {rechargeOptions
                  .filter((option) => option.price > 0)
                  .map((option, index) => (
                    <CoinOption
                      key={index}
                      coins={option.coins}
                      price={option.price}
                      onClick={() =>
                        handleOptionSelect(option.coins, option.price)
                      }
                    />
                  ))}
                <CustomAmountInput
                  customAmount={customAmount}
                  purchaseRate={(
                    parseInt(customAmount || "0", 10) * purchaseRate
                  ).toFixed(2)}
                  onChange={setCustomAmount}
                  onSubmit={handleCustomAmountSubmit}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-2xl">
                <p>Total</p>
                <p className="font-semibold text-primary">
                  ${totalAmount || "0"}
                </p>
              </div>
              <hr className="border-primary border-[1.5px]" />
              <Button
                disabled={isRechargeDisabled}
                onClick={handleRechargeClick}
                variant="primary"
                className="w-full"
              >
                Recharge
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BalanceTopUp;
