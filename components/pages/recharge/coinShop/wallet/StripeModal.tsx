import { getData, postData } from "@/api";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface StripeModalProps {
  rechargeAmonut: { totalAmount: number; coinAmount: number };
  //   paymentModalClose: boolean;
}

const StripeModal: React.FC<StripeModalProps> = ({ rechargeAmonut }) => {
  const [loading, setLoading] = useState(false);
  const [cardList, setCardList] = useState<any[]>([]);
  const [paginationLinks, setPaginationLinks] = useState({
    first: "",
    last: "",
    prev: null,
    next: null,
  });
  const router = useRouter();

  const getCardFunc = async (url: string = "/cards") => {
    setLoading(true);
    try {
      const responseData = await getData(url);
      const { links, cards: cardsDetails } = responseData.data;

      setCardList(cardsDetails || []);
      setPaginationLinks(links);
    } catch (error: any) {
      //   console.log("cards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCardFunc();
  }, []);

  const openGateWayLink = (url: string) => {
    window.open(url, "_blank");
  };

  const addCardfunc = async (data: any) => {
    const addCardData = { label: "First" };

    try {
      setLoading(true);
      const responseData = await postData("/cards/stripe/start", addCardData);
      const goToLink = responseData.data.link;
      openGateWayLink(goToLink);
    } catch (error: any) {
      //   console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCardFunc();
  }, [router.query]);

  return (
    <>
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Payment With card</h2>
          <button className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="border-t border-b py-4 mb-4">
          <div className="flex items-center justify-between">
            <span>Add card</span>
            <span
              onClick={addCardfunc}
              className="h-12 w-12 flex items-center justify-center cursor-pointer  shrink-0 rounded-full hover:bg-slate-100"
            >
              +
            </span>
          </div>
        </div>

        <div className="p-6 text-center">
          {loading && <p>Fetching card</p>}
          {!loading && cardList.length === 0 && <p>No cards available</p>}
        </div>

        {cardList.length !== 0 && (
          <div>
            {cardList.map((card, index) => (
              <div key={index} className="border-b p-4">
                <p>Card ID: {card.id}</p>
                <p>Card Type: {card.type}</p>
                <p>Card Number: {card.number}</p>
              </div>
            ))}

            <div className="flex justify-between my-4">
              <button
                onClick={() =>
                  paginationLinks.prev && getCardFunc(paginationLinks.prev)
                }
                disabled={!paginationLinks.prev}
                className={`py-2 px-4 rounded ${
                  !paginationLinks.prev
                    ? "bg-gray-300"
                    : "bg-blue-500 hover:bg-blue-600"
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
                  !paginationLinks.next
                    ? "bg-gray-300"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        <button className="w-full bg-primary text-black py-3 rounded-lg font-semibold hover:bg-primary transition-colors">
          Continue
        </button>
      </div>
    </>
  );
};

export default StripeModal;
