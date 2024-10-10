import { getData, postData } from "@/api";
import { useUserContext } from "@/context/UserContext";
import { Routes } from "@/utils/variables";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import useToast from "./useToast";

const useUser = () => {
  const {
    setUserDetails,
    setUserAuthDetails,
    userDetails,
    setUserWallet,
    userWallet,
    ...details
  } = useUserContext();

  // Separate state management for loading states
  const [loadingUserDetails, setLoadingUserDetails] = useState(false);
  const [loadingUserWallet, setLoadingUserWallet] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const logoutUser = useCallback(async () => {
    try {
      const responds = await postData("/logout", null);
      setUserDetails(undefined);
      setUserAuthDetails(undefined);
      localStorage.removeItem("Atoken");
      router.push(Routes.Home.path);
      showToast(responds.data.message);
    } catch {
      // f
    }
  }, [router, setUserDetails, setUserAuthDetails, showToast]);

  const retryGetUserDetails = useCallback(
    async (retryCount = 0) => {
      try {
        const { data: responseData } = await getData("/account");
        setUserDetails(responseData);
      } catch (error: any) {
        if (error?.code === 403 || error?.code === 401) {
          logoutUser();
          return;
        }

        if (retryCount < 3) {
          await retryGetUserDetails(retryCount + 1);
        } else {
          // console.error("Error fetching user details:", error);
        }
      }
    },
    [logoutUser, setUserDetails]
  );

  const getUserDetails = useCallback(async () => {
    setLoadingUserDetails(true);
    try {
      await retryGetUserDetails();
    } finally {
      setLoadingUserDetails(false);
    }
  }, [retryGetUserDetails]);

  const getUserWallet = useCallback(async () => {
    setLoadingUserWallet(true);
    try {
      const { data: balanceData } = await getData("/wallet");
      setUserWallet(balanceData);
    } catch (error: any) {
      if (error?.code === 403 || error?.code === 401) {
        logoutUser();
        return;
      }
    } finally {
      setLoadingUserWallet(false);
    }
  }, [logoutUser, setUserWallet]);

  return {
    setUserAuthDetails,
    setUserDetails,
    getUserDetails,
    getUserWallet,
    userDetails,
    userWallet,
    loadingUserDetails,
    setLoadingUserWallet,
    loadingUserWallet,
    logoutUser,
    ...details,
  };
};

export default useUser;
