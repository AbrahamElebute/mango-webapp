import React, { useEffect, useState } from "react";
import { CoinIcon, FileInvoiceDollar } from "@/assets/icon";
import Button from "@/components/ui/form/Button";
import Modal from "@/components/ui/modal/Modal";
import OrderSummaryModal from "../OrderSummaryModal";
import TransactionHistoryModal from "../TransactionHistoryModal";

interface RechargeOption {
  coins: number;
  price: number;
}

const CoinShop: React.FC = () => {
  const [customAmount, setCustomAmount] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [selectedCoins, setSelectedCoins] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRechargeDisabled, setIsRechargeDisabled] = useState<boolean>(true);
  const [isTransactionHistoryOpen, setIsTransactionHistoryOpen] =
    useState<boolean>(false);

  const rechargeOptions: RechargeOption[] = [
    { coins: 69, price: 0.99 },
    { coins: 139, price: 3.7 },
    { coins: 349, price: 7.5 },
    { coins: 1469, price: 14.5 },
    { coins: 3429, price: 36 },
    { coins: 6999, price: 185 },
    { coins: 6999, price: 185 },
  ];

  useEffect(() => {
    setIsRechargeDisabled(totalAmount === "");
  }, [totalAmount]);

  const handleOptionClick = (coins: number, price: number) => {
    setTotalAmount(price.toString());
    setSelectedCoins(coins);
    setCustomAmount("");
  };

  const handleCustomSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (customAmount) {
      setTotalAmount(customAmount);
      setSelectedCoins(parseInt(customAmount, 10));
    }
  };

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleTransactionHistoryModal = () => {
    setIsTransactionHistoryOpen((prev) => !prev);
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
          <div className="flex justify-between text-sm">
            <h1 className="font-semibold">Your Balance</h1>
            <p
              onClick={handleTransactionHistoryModal}
              className="text-gray-600 flex items-center gap-1 cursor-pointer hover:text-gray-800"
            >
              <FileInvoiceDollar size={16} />
              Transaction History
            </p>
          </div>

          <p className="flex items-center gap-2 text-2xl font-semibold">
            <CoinIcon size={28} color="gold" />
            30
          </p>

          <div>
            <p className="font-semibold mb-3">Recharge</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {rechargeOptions.map((option, index) => (
                <div
                  key={index}
                  className="bg-[#F3F5F7] rounded-lg p-3 text-center cursor-pointer flex flex-col items-center justify-center"
                  onClick={() => handleOptionClick(option.coins, option.price)}
                >
                  <div className="flex justify-center items-center mb-4">
                    <CoinIcon />
                    <span className="ml-1 font-semibold">{option.coins}</span>
                  </div>
                  <p className="bg-[#F9C03459] w-fit text-sm py-1 px-3 rounded-lg  transition-colors">
                    ${option.price}
                  </p>
                </div>
              ))}
              <form
                onClick={handleCustomSubmit}
                onSubmit={handleCustomSubmit}
                className="bg-gray-100 rounded-lg cursor-pointer p-3 text-center flex flex-col items-center justify-center"
              >
                <div className="flex justify-center items-center mb-2">
                  <div>
                    <CoinIcon />
                  </div>

                  <input
                    type="tel"
                    value={customAmount}
                    onChange={({ target: { value } }) => {
                      if (/^\d*$/.test(value)) {
                        setCustomAmount(value);
                      }
                    }}
                    placeholder=""
                    className="ml-1 w-full text-center bg-transparent border-b-2 outline-none border-gray-400"
                  />
                </div>
                <p className="bg-[#F9C03459] w-fit text-sm py-1 px-3 rounded-lg  transition-colors">
                  {customAmount ? <>{customAmount}</> : "0"}
                </p>
              </form>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-2xl">
              <p>Total</p>
              <p className="font-semibold text-primary">
                ${totalAmount ? <>{totalAmount}</> : "0"}
              </p>
            </div>
            <hr className="border-primary border-[1.5px]" />
            <Button
              disabled={isRechargeDisabled}
              onClick={handleModal}
              className="w-full bg-primary"
            >
              Recharge
            </Button>
          </div>
        </div>
      </div>
      <Modal
        opened={isModalOpen}
        onClose={handleModal}
        closeOnClickOutside={true}
      >
        <OrderSummaryModal
          totalAmount={parseFloat(totalAmount)}
          coinAmount={selectedCoins}
          onClose={handleModal}
        />
      </Modal>

      <Modal
        opened={isTransactionHistoryOpen}
        onClose={handleTransactionHistoryModal}
        closeOnClickOutside={true}
      >
        <TransactionHistoryModal onClose={handleTransactionHistoryModal} />
      </Modal>
    </>
  );
};

export default CoinShop;
