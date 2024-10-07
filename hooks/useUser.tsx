import { getData } from "@/api";
import { useUserContext } from "@/context/UserContext";
import { useCallback, useState } from "react";

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

  const logoutUser = useCallback(() => {
    // alert("logoutUser");
  }, []);

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
    ...details,
  };
};

export default useUser;
