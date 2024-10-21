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
  // const [loadingUserWallet, setLoadingUserWallet] = useState(false);
  // const [loadingUserDetails, setLoadingUserDetails] = useState(false);

  const [loadingState, setLoadingState] = useState({
    userDetails: false,
    userLogout: false,
    userWallet: false,
  });

  const router = useRouter();
  const { showToast } = useToast();

  const logoutUser = useCallback(async () => {
    try {
      setLoadingState((prev) => ({ ...prev, userLogout: true }));
      const response = await postData("/logout", null);
      setUserDetails(undefined);
      setUserAuthDetails(undefined);
      localStorage.removeItem("Atoken");
      router.push(Routes.Home.path);
      showToast(response?.data?.message || "Logged out successfully!");
    } catch (error: any) {
      showToast(error?.response?.data?.message || "Error logging out!");
    } finally {
      setLoadingState((prev) => ({ ...prev, userLogout: false }));
    }
  }, [router, setUserDetails, setUserAuthDetails, showToast]);

  const retryGetUserDetails = useCallback(
    async (retryCount = 0) => {
      try {
        setLoadingState((prev) => ({ ...prev, userDetails: true }));
        const { data: responseData } = await getData("/account");
        setUserDetails(responseData);
      } catch (error: any) {
        if (error?.code === 403 || error?.code === 401) {
          setUserDetails(undefined);
          setUserAuthDetails(undefined);
          localStorage.removeItem("Atoken");
          router.push(Routes.Home.path);
          return;
        }

        if (retryCount < 3) {
          await retryGetUserDetails(retryCount + 1);
        } else {
          showToast(
            error?.response?.data?.message || "Error fetching user details"
          );
        }
      } finally {
        setLoadingState((prev) => ({ ...prev, userDetails: false }));
      }
    },
    [setUserDetails, showToast, router, setUserAuthDetails]
  );

  const getUserDetails = useCallback(async () => {
    await retryGetUserDetails();
  }, [retryGetUserDetails]);

  const getUserWallet = useCallback(async () => {
    setLoadingState((prev) => ({ ...prev, userWallet: true }));
    try {
      const { data: balanceData } = await getData("/wallet");
      setUserWallet(balanceData);
    } catch (error: any) {
      // error
    } finally {
      setLoadingState((prev) => ({ ...prev, userWallet: false }));
    }
  }, [setUserWallet]);

  return {
    setUserAuthDetails,
    setUserDetails,
    getUserDetails,
    getUserWallet,
    userDetails,
    userWallet,
    loadingState,
    logoutUser,
    ...details,
  };
};

export default useUser;
