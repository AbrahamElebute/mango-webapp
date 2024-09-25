import { setHeaderAuthorization } from "@/api";
import { useAuthModal } from "@/hooks/useAuthModal";
import useUser from "@/hooks/useUser";
import { getSavedToken } from "@/localservices";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";

const protectedRoutes = ["/recharge", "/profile", "/protected-action"];

const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
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
  }, [router, openModal, switchScreen, setUserAuthDetails, getUserDetails]);
  useEffect(() => {
    if (!userAuthDetails) {
      authenticateUser();
    }
  }, [userAuthDetails, authenticateUser]);
  return <>{children}</>;
};

export default AppLayout;
