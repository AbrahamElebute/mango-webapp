import { getData, postData } from "@/api";
import { MenuCloseIcon } from "@/assets/icon";
// import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback } from "react";
import { useModal } from "@/context/ModalContext";
import PlaceholderState from "@/components/ui/PlaceholderState";
import Button from "@/components/ui/form/Button";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import { toast } from "react-toastify";

interface StripeModalProps {
  rechargeAmonut: { totalAmount: number; coinAmount: number };
}

interface Card {
  id: string;
  number: string;
  name: string;
  expiry_month: number;
  expiry_year: number;
  brand: string;
  status: string;
}

interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

const StripeModal: React.FC<StripeModalProps> = ({ rechargeAmonut }) => {
  const [loading, setLoading] = useState(false);
  const [cardList, setCardList] = useState<Card[]>([]);
  const [paginationLinks, setPaginationLinks] = useState<PaginationLinks>({
    first: "",
    last: "",
    prev: null,
    next: null,
  });
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const { closeModal } = useModal();
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(true);

  const getCardFunc = useCallback(async (url: string = "/cards") => {
    setLoading(true);
    try {
      const responseData = await getData(url);
      const { links, cards: cardsDetails } = responseData.data;
      setCardList(cardsDetails || []);
      setPaginationLinks(links);
    } catch (error: any) {
      // console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addCardfunc = async () => {
    const addCardData = { label: "First" };
    try {
      setLoading(true);
      const responseData = await postData("/cards/stripe/start", addCardData);
      const goToLink = responseData.data.link;
      window.open(goToLink, "_blank");
    } catch (error: any) {
      // console.error("Error adding card:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCardFunc();
  }, [getCardFunc]);

  useEffect(() => {
    setIsBtnDisabled(cardList.length === 0 || !selectedCardId);
  }, [cardList, selectedCardId]);

  const handleCardClick = (card: Card) => {
    setSelectedCardId(card.id);
  };

  const handleContinueClick = async () => {
    if (selectedCardId) {
      const data = {
        card_id: selectedCardId,
        amount: rechargeAmonut.totalAmount,
        remarks: "",
      };

      setLoading(true);
      try {
        const responseData = await postData("/wallet/fund", data);
        const { data: resp } = responseData || {};
        toast(resp);
      } finally {
        setLoading(false);
      }
    } else {
      // alert("Please select a card.");
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        //
      } else {
        // User has returned to the page
        getCardFunc();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [getCardFunc]);

  const getCardBrandColor = (brand: string): string => {
    const brandColors: { [key: string]: string } = {
      visa: "text-blue-600",
      mastercard: "text-red-600",
      "american express": "text-green-600",
      amex: "text-green-600",
      discover: "text-purple-600",
      "diners club": "text-yellow-600",
      jcb: "text-pink-600",
    };

    return brandColors[brand.toLowerCase()] || "text-gray-600";
  };

  return (
    <div className="bg-white rounded-lg p-6 w-[50vw]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Payment With Card</h2>
        <button
          onClick={closeModal}
          className="text-gray-500 hover:text-gray-700"
        >
          <MenuCloseIcon />
        </button>
      </div>
      <div className="border-t border-b py-4">
        <div className="flex items-center justify-between">
          <span className="text-xl">Add card</span>
          <span
            onClick={addCardfunc}
            className="h-12 w-12 text-2xl flex items-center justify-center cursor-pointer shrink-0 rounded-full hover:bg-slate-100 bg-slate-50"
          >
            +
          </span>
        </div>
      </div>

      {loading ? (
        <div>
          <SkeletonLoader className="h-56 mb-8" />
          <SkeletonLoader className="h-10 rounded-md" />
        </div>
      ) : (
        <>
          {cardList.length === 0 ? (
            <PlaceholderState
              title="No cards linked to your account."
              description="Start adding your cards to keep track of your payments. Click “Add Card” to proceed."
              buttonText="Add Card"
              onButtonClick={addCardfunc}
            />
          ) : (
            <ul className="my-10 flex flex-col gap-4">
              {cardList.map((card) => (
                <li
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  className={`relative cursor-pointer bg-slate-100 h-40 p-4 rounded-md flex flex-col justify-between transition-all hover:shadow-lg hover:bg-slate-200 ${
                    selectedCardId === card.id ? "border-2 border-blue-500" : ""
                  }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-gray-700">{card.name}</p>
                      <p className="text-4xl font-bold">{card.number}</p>
                      <p className="uppercase text-xs text-gray-500">
                        ID: {card.id}
                      </p>
                    </div>
                    <p
                      className={`capitalize font-medium ${getCardBrandColor(
                        card.brand
                      )}`}
                    >
                      {card.brand}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <p
                      className={`py-1 px-2 text-xs rounded-full text-white ${
                        card.status === "active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {card.status}
                    </p>
                    <div className="flex gap-1 text-gray-600">
                      <p>{card.expiry_month}</p>
                      <p>/{card.expiry_year.toString().slice(-2)}</p>
                    </div>
                  </div>
                </li>
              ))}

              {paginationLinks.next && (
                <div className="flex justify-between my-4">
                  <button
                    onClick={() =>
                      paginationLinks.prev && getCardFunc(paginationLinks.prev)
                    }
                    disabled={!paginationLinks.prev}
                    className={`py-2 px-4 rounded ${
                      !paginationLinks.prev ? "bg-gray-300" : "bg-primary"
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      paginationLinks.next && getCardFunc(paginationLinks.next)
                    }
                    disabled={!paginationLinks.next}
                    className={`py-2 px-4 rounded ${
                      !paginationLinks.next ? "bg-gray-300" : "bg-primary"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </ul>
          )}

          <Button
            disabled={isBtnDisabled}
            variant="primary"
            className="w-full mt-4"
            onClick={handleContinueClick}
          >
            Continue
          </Button>
        </>
      )}
    </div>
  );
};

export default StripeModal;
