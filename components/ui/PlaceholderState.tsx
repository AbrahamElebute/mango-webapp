import { PlaceholderStateProps } from "@/utils/types";
import dynamic from "next/dynamic";
import React from "react";
import { emptyList } from "@/assets/images/lottiefiles";

const PlaceholderState: React.FC<PlaceholderStateProps> = ({
  title,
  description,
  lottie,
  widthLottie = 120,
  heightLottie = 100,
  buttonText,
  onButtonClick,
}) => {
  const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

  return (
    <div className="flex flex-col gap-4 items-center justify-centers">
      <div className={`w-[${widthLottie}] h-[${heightLottie}]`}>
        <Lottie
          loop={true}
          autoplay={true}
          style={{ width: widthLottie || 120, height: heightLottie || 100 }}
          animationData={lottie || emptyList}
        />
      </div>
      <div>
        <h1 className="text-2xl text-center font-semibold text-gray-800">
          {title}
        </h1>

        {description && (
          <p className="text-gray-600 text-center  max-w-lg">{description}</p>
        )}
      </div>

      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default PlaceholderState;
