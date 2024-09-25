import { getData } from "@/api";
import { useUserContext } from "@/context/UserContext";
import { useCallback } from "react";

const useUser = () => {
  const { setUserDetails, setUserAuthDetails, userDetails, ...details } =
    useUserContext();

  const logoutUser = useCallback(() => {}, []);

  const getUserDetails = useCallback(async () => {
    try {
      const { data: responseData } = await getData("/account");
      setUserDetails(responseData);
    } catch (error: any) {
      if (error?.response?.status === 403 || error?.response?.status === 401) {
        logoutUser();
        return;
      }
      getUserDetails();
    }
  }, [setUserDetails, logoutUser]);

  return {
    setUserAuthDetails,
    setUserDetails,
    getUserDetails,
    userDetails,
    ...details,
  };
};

export default useUser;
