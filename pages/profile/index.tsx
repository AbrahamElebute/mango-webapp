import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AgeIcon, CopyIcon } from "@/assets/icon";
import { boltLightingSvg, flagSvg, QRCode } from "@/assets/images";
import UserSocial from "@/components/general/UserSocial";
import SectionContainer from "@/components/Layout/SectionContainer";
import Button from "@/components/ui/form/Button";
import PlaceholderState from "@/components/ui/PlaceholderState";
import useToast from "@/hooks/useToast";
import useUser from "@/hooks/useUser";

const UserProfile = () => {
  const { userDetails } = useUser();
  const { showToast } = useToast();

  const copyToClipboard = (id: string | undefined) => {
    navigator.clipboard
      .writeText(`Mango ID: ${id}`)
      .then(() => showToast("Copied successfully!", "success"))
      .catch(() => showToast("Failed to copy!", "error"));
  };

  return (
    <SectionContainer className="space-y-6">
      <div className=" grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="h-80 w-full rounded-lg overflow-hidden bg-slate-100 relative">
            <Image
              src={userDetails?.avatar || "/placeholder-avatar.jpg"}
              alt="User Avatar"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xl font-bold">{userDetails?.username}</p>
                <p className="text-sm font-medium">{userDetails?.name}</p>
              </div>
              <Image src={flagSvg} alt="Flag" width={24} height={24} />
            </div>
            <div className="flex items-center gap-4">
              <Image
                src={boltLightingSvg}
                alt="Lightning"
                width={24}
                height={24}
              />
              <Button variant="primary" isSpecial className="py-2 px-4">
                Follow
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <p className="text-sm text-black/70 truncate max-w-[150px]">
                ID: {userDetails?.id}
              </p>
              <button
                onClick={() => copyToClipboard(userDetails?.id)}
                className="focus:outline-none"
              >
                <CopyIcon className="w-4 h-4" />
              </button>
            </span>
            <span className="bg-[rgba(255,99,129,1)] text-white py-1 px-3 rounded-full font-bold flex items-center gap-1">
              <AgeIcon className="w-4 h-4" />0
            </span>
            <span className="bg-[rgba(254,183,73,1)] py-1 px-3 text-white rounded-full font-bold">
              Lv. 1
            </span>
          </div>
          <div className="bg-slate-100 p-3 rounded-xl">
            <div className="bg-white flex items-stretch divide-x-2 divide-primary">
              {["Following", "Followers", "Likes"].map((label) => (
                <div key={label} className="flex-1 p-2 text-center">
                  <p className="text-xl font-bold">0</p>
                  <p className="text-sm text-black/70">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
            <h2 className="text-xl font-semibold mb-4">Download App</h2>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="space-y-4">
                <p className="text-gray-600">
                  Scan with your phone&apos;s camera or QR code app to view.
                </p>
                <div className="flex flex-col gap-4">
                  <Link
                    href="https://play.google.com/store/apps"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      width={176}
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
              <div className="w-32 h-32 relative">
                <Image
                  src={QRCode}
                  alt="QR Code"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Bio</h2>
              <p className="text-gray-700">
                GMA THE CLASH🔥 TOP 320 ❤️ GMA STUDIO 7 CHAMPION ARTIST 🤖👽👻
              </p>
            </div>
            <div className="mt-6 w-72">
              <UserSocial />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="border-b border-primary pb-2">
          <h2 className="text-xl font-semibold">Videos</h2>
        </div>
        <div className="mt-4">
          <PlaceholderState
            title="No Videos Posted Yet"
            description="Start uploading videos to share with your audience. Click 'Upload Video' to get started."
          />
        </div>
      </div>
    </SectionContainer>
  );
};

export default UserProfile;
