import React from "react";
import { toggleMenuProps } from "@/utils/types";
import Modal from "@/components/ui/modal/Modal";
import Link from "next/link";
import Image from "next/image";
import { QRCode } from "@/assets/images";

const DownloadAppModal: React.FC<toggleMenuProps> = ({
  toggleMenu,
  openModal,
}) => {
  return (
    <Modal
      contentClassName="!top-24 !translate-y-[0] transition-none"
      opened={true}
      onClose={toggleMenu}
      bgClassname={"!bg-opacity-0 !backdrop-blur-[0px]"}
      dialogEnterTransition=""
      dialogEnterToAnimation=""
      dialogEnterFromAnimation=""
    >
      <div className="bg-white flex flex-col gap-2 items-center !shadow-md rounded-lg overflow-hidden p-6">
        <h2 className="text-xl font-semibold">Download App</h2>
        <p className="text-gray-600 text-center">
          Scan with your phone&apos;s camera or QR <br /> code app to view.
        </p>{" "}
        <div className="w-32 h-32 relative">
          <Image src={QRCode} alt="QR Code" layout="fill" objectFit="contain" />
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://play.google.com/store/apps"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              width={160}
              height={52}
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
            />
          </Link>
          <Link
            href="https://apps.apple.com/app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              width={160}
              height={53}
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
            />
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default DownloadAppModal;
