import { setHeaderAuthorization } from "@/api";
import { useAuthModal } from "@/hooks/useAuthModal";
import useUser from "@/hooks/useUser";
import { getSavedToken } from "@/localservices";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import SplashScreen from "../ui/splashScreen/SplashScreen";

const protectedRoutes = ["/recharge", "/profile", "/protected-action"];

const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [appLoading, setAppLoading] = useState(true);
  const router = useRouter();
  const { setUserAuthDetails, userAuthDetails, getUserDetails } = useUser();
  const { switchScreen, openModal } = useAuthModal();

  const authenticateUser = useCallback(async () => {
    const savedAuthDetails = await getSavedToken();
    if (!savedAuthDetails && protectedRoutes.includes(router.pathname)) {
      router.push(`/?next=${router?.pathname}`);
      switchScreen("login");
      openModal();
      return;
    }
    if (savedAuthDetails) {
      setHeaderAuthorization(savedAuthDetails);
      setUserAuthDetails(savedAuthDetails);
      getUserDetails();
    }
    setAppLoading(false);
  }, [router, openModal, switchScreen, setUserAuthDetails, getUserDetails]);

  useEffect(() => {
    if (!userAuthDetails) {
      authenticateUser();
    }
  }, [userAuthDetails, authenticateUser]);
  if (appLoading) {
    return <SplashScreen />;
  }
  return <>{children}</>;
};

export default AppLayout;
