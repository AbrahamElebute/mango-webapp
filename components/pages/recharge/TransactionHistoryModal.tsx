import React, { useState, useEffect, useCallback } from "react";
import { getData } from "@/api";
import { CoinIcon, XIcon } from "@/assets/icon";
import PlaceholderState from "@/components/ui/PlaceholderState";
import {
  emptyLotties,
  errorLotties,
  LoadingLottie,
} from "@/assets/images/lottiefiles";
import useUser from "@/hooks/useUser";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  title: string;
  amount: {
    amount: string;
    display: string;
    whole: string;
    symbol: string;
    currency: string;
  };
  created_at: string;
}

const TransactionHistoryModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [filter, setFilter] = useState("All");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userWallet } = useUser();

  const getTransactionDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data: responseData } = await getData("/wallet/transactions");
      setTransactions(responseData.transactions);
      setError(null);
    } catch (error: any) {
      setError(
        error.message || "An error occurred while fetching transactions"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getTransactionDetails();
  }, [getTransactionDetails]);

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter(
          (t) => t.type === (filter === "Succeed" ? "credit" : "debit")
        );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] min-h-[400px] space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Transaction Record</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <XIcon height={12} />
        </button>
      </div>

      <div className="flex justify-between border-y-2 py-4 ">
        <button
          className={`px-3 py-1 rounded ${
            filter === "All" ? "bg-gray-200" : "bg-white hover:bg-gray-50"
          } `}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === "Succeed" ? "bg-gray-200" : "bg-white hover:bg-gray-50 "
          }  `}
          onClick={() => setFilter("Succeed")}
        >
          Success
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === "Failed" ? "bg-gray-200" : "bg-white hover:bg-gray-50"
          }  `}
          onClick={() => setFilter("Failed")}
        >
          Fail
        </button>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <PlaceholderState
            lottie={LoadingLottie}
            widthLottie={320}
            heightLottie={150}
            title="Loading Transactions..."
            description="Please wait while we retrieve your transaction history."
          />
        )}

        {error && (
          <div className="text-center text-red-500">
            <PlaceholderState
              lottie={errorLotties}
              title={`${error}`}
              description="We encountered an issue while retrieving your transaction history. Please try again later or contact support if the problem persists."
            />
          </div>
        )}

        {!isLoading && !error && filteredTransactions.length === 0 && (
          <PlaceholderState
            lottie={emptyLotties}
            title="No transactions found"
            description="It looks like you don't have any transaction records yet. Once you make a transaction, it will appear here."
          />
        )}

        {!isLoading &&
          !error &&
          filteredTransactions.length > 0 &&
          filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="border-b pb-4">
              <div className="flex justify-between items-center mb-2 bg-[#F3F5F7] p-2 rounded-sm">
                <span className="text-sm text-black font-semibold">
                  {new Date(transaction.created_at).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-400">
                  Order number:{" "}
                  <span className="uppercase">{transaction.id}</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CoinIcon />
                  <span className="font-semibold">
                    {transaction.amount.whole}
                  </span>
                </div>
                <span className="text-gray-600">
                  Cost: $
                  {(
                    Number(transaction?.amount?.whole) *
                    Number(userWallet?.purchase_rate)
                  ).toString()}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center justify-between">
                  <span>{transaction.title}</span>
                  <span>{transaction.type}</span>
                </div>
                <span
                  className={
                    transaction.type === "credit"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {transaction.type === "credit" ? "Credit" : "Debit"}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TransactionHistoryModal;
