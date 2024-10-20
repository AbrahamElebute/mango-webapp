import { getData, postData } from "@/api";
import { XIcon } from "@/assets/icon";
import React, { useEffect, useState, useCallback } from "react";
import { useModal } from "@/context/ModalContext";
import PlaceholderState from "@/components/ui/PlaceholderState";
import Button from "@/components/ui/form/Button";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import useToast from "@/hooks/useToast";
import useUser from "@/hooks/useUser";

interface StripeModalProps {
  rechargeAmonut: { totalAmount: number; coinAmount: number };
}

type CardBrand =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "diners club"
  | "jcb"
  | string;

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
  const [loadingCards, setLoadingCards] = useState(false); // For fetching cards
  const [loadingAddCard, setLoadingAddCard] = useState(false); // For adding a new card
  const [loadingPayment, setLoadingPayment] = useState(false); // For processing payment
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
  const { showToast } = useToast();
  const { getUserWallet } = useUser();

  // Function to fetch cards
  const getCardFunc = useCallback(
    async (url: string = "/cards") => {
      setLoadingCards(true);
      try {
        const responseData = await getData(url);
        const { links, cards: cardsDetails } = responseData.data;
        setCardList(cardsDetails || []);
        setPaginationLinks(links);
      } catch (error) {
        showToast("Failed to fetch cards. Please try again.");
      } finally {
        setLoadingCards(false);
      }
    },
    [showToast]
  );

  // Function to add a new card
  const addCardFunc = async () => {
    const addCardData = { label: "First" };
    try {
      setLoadingAddCard(true);
      const responseData = await postData("/cards/stripe/start", addCardData);
      const goToLink = responseData.data.link;
      window.open(goToLink, "_blank");
      closeModal();
    } catch (error) {
      showToast("Failed to add card. Please try again.");
    } finally {
      setLoadingAddCard(false);
    }
  };

  // Function to handle payment
  const handleContinueClick = async () => {
    if (selectedCardId) {
      const data = {
        card_id: selectedCardId,
        amount: rechargeAmonut.totalAmount,
        remarks: "",
      };

      setLoadingPayment(true);
      try {
        const responseData = await postData("/wallet/fund", data);
        const { data: resp } = responseData || {};
        showToast(
          `${resp.message} amount: ${resp.amount.display}` ||
            "payment successfully!"
        );
        getUserWallet();
        closeModal();
      } catch (err: any) {
        showToast(err.response.message || "Payment failed.");
      } finally {
        setLoadingPayment(false);
      }
    }
  };

  useEffect(() => {
    getCardFunc();
  }, []);

  useEffect(() => {
    setIsBtnDisabled(cardList.length === 0 || !selectedCardId);
  }, [cardList, selectedCardId]);

  const handleCardClick = (card: Card) => {
    setSelectedCardId(card.id);
  };

  const brandColors = {
    visa: "text-blue-600",
    mastercard: "text-red-600",
    amex: "text-green-600",
    discover: "text-purple-600",
    "diners club": "text-yellow-600",
    jcb: "text-pink-600",
  } as const;

  const getCardBrandColor = (brand: CardBrand): string => {
    return brandColors[brand as keyof typeof brandColors] || "text-gray-500";
  };
  return (
    <div className="bg-white rounded-lg p-6 w-[50vw] h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Payment With Card</h2>
        <button
          onClick={closeModal}
          className="text-gray-500 hover:text-gray-700"
        >
          <XIcon height={12} />
        </button>
      </div>

      {/* Add Card Section */}
      <div className="border-t border-b py-4">
        <div className="flex items-center justify-between">
          <span className="text-xl">Add card</span>
          <span
            onClick={addCardFunc}
            className="h-12 w-12 text-2xl flex items-center justify-center cursor-pointer shrink-0 rounded-full hover:bg-slate-100 bg-slate-50"
          >
            {loadingAddCard ? (
              <LoadingIndicator type="spinner" size="w-6 h-6" /> // Use LoadingIndicator
            ) : (
              "+"
            )}
          </span>
        </div>
      </div>

      {/* Cards Section */}
      {loadingCards && (
        <LoadingIndicator type="skeleton" className="h-56 mb-8" /> // Use LoadingIndicator
      )}

      {!loadingCards && cardList.length === 0 && (
        <PlaceholderState
          title="No cards linked to your account."
          description="Start adding your cards to keep track of your payments. Click “Add Card” to proceed."
          buttonText="Add New Card"
          onButtonClick={addCardFunc}
        />
      )}

      {!loadingCards && cardList.length > 0 && (
        <ul className="my-10 flex flex-col gap-4">
          {cardList.map((card) => (
            <li
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`relative cursor-pointer bg-slate-100 h-40 p-4 rounded-md flex flex-col justify-between hover:shadow-sm hover:bg-slate-320 000 ${
                selectedCardId === card.id
                  ? "outline outline-2 outline-primary"
                  : ""
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
                  <span>Expires</span>
                  <span>
                    {card.expiry_month}/{card.expiry_year}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

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

      {/* Continue Button */}
      <Button
        onClick={handleContinueClick}
        className="w-full mt-6"
        variant="primary"
        disabled={isBtnDisabled}
      >
        {loadingPayment ? (
          <LoadingIndicator type="spinner" size="w-5 h-5" />
        ) : (
          "Continue"
        )}
      </Button>
    </div>
  );
};

export default StripeModal;
