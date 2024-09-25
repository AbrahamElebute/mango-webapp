import AppPromotionBanner from "@/components/general/AppPromotionBanner";
import { Footer, NavBar } from "@/components/general/navigation";
import AuthModal from "@/components/pages/auth/AuthModal";
import "@/styles/globals.css";
import { useAuthModal } from "@/hooks/useAuthModal";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import ContextWrapper from "@/context/ContextWrapper";
import AppLayout from "@/components/Layout/AppLayout";

type CustomAppProps = AppProps & {
  Component: AppProps["Component"] & {
    hideNav?: boolean;
    hideFooter?: boolean;
    showBanner?: boolean;
  };
};

export default function App({ Component, pageProps }: CustomAppProps) {
  const router = useRouter();
  const { isOpen, currentScreen, closeModal, switchScreen } = useAuthModal();

  const getNavBarStyles = () => {
    if (router.pathname === "/") {
      return {
        logoColor: "var(--primary)",
        headerStyle: "border-0",
      };
    }

    return {
      logoColor: "var(--secondary)",
      headerStyle: "border-b-2 border-[#DFDFE1]",
    };
  };

  const navBarStyles = getNavBarStyles();

  return (
    <>
      <ContextWrapper>
        <AppLayout>
          {Component.showBanner && <AppPromotionBanner />}
          <NavBar {...navBarStyles} />
          <Component {...pageProps} />
          <Footer />
          <AuthModal
            isOpen={isOpen}
            onClose={closeModal}
            currentScreen={currentScreen}
            switchScreen={switchScreen}
          />
        </AppLayout>
      </ContextWrapper>
    </>
  );
}
