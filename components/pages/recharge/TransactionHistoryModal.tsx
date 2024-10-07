import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { getData } from "@/api";
import { MenuCloseIcon } from "@/assets/icon";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  title: string;
  amount: { display: string };
  created_at: string;
}

const TransactionHistoryModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [filter, setFilter] = useState("All");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Transaction Record</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <MenuCloseIcon />
        </button>
      </div>

      <div className="flex space-x-4 mb-4">
        <button
          className={`px-3 py-1 rounded ${
            filter === "All" ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === "Succeed" ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => setFilter("Succeed")}
        >
          Credit
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === "Failed" ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => setFilter("Failed")}
        >
          Debit
        </button>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <div className="text-center text-gray-500">
            Loading transactions...
          </div>
        )}

        {error && <div className="text-center text-red-500">{error}</div>}

        {!isLoading && !error && filteredTransactions.length === 0 && (
          <div className="text-center text-gray-500">No transactions found</div>
        )}

        {!isLoading &&
          !error &&
          filteredTransactions.length > 0 &&
          filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  {new Date(transaction.created_at).toLocaleDateString()}
                </span>
                <span className="text-xs text-gray-400">
                  ID: {transaction.id}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span
                    className={`mr-1 ${
                      transaction.type === "credit"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    ●
                  </span>
                  <span className="font-semibold">{transaction.title}</span>
                </div>
                <span className="text-gray-600">
                  {transaction.amount.display}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <Image
                    src={`/api/placeholder/24/24`}
                    alt={transaction.type}
                    width={24}
                    height={24}
                    className="w-6 h-6 mr-2"
                  />
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
