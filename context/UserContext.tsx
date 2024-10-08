import { UserDetailsType, UserWalletType } from "@/api/index.d";
import { userInitialValue, userReducer } from "@/reducers";
import {
  SET_AUTH_DETAILS,
  SET_USER_DETAILS,
  SET_USER_WALLET,
} from "@/utils/_enums";
import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

const UserContext = createContext({
  ...userInitialValue,
  setUserAuthDetails: (_userAuthDetails?: string) => {},
  setUserDetails: (_userDetails?: UserDetailsType) => {},
  setUserWallet: (_userWallet?: UserWalletType) => {},
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(userReducer, userInitialValue);
  const setUserAuthDetails = useCallback((payload?: string) => {
    dispatch({
      type: SET_AUTH_DETAILS,
      payload,
    });
  }, []);
  const setUserDetails = useCallback((payload?: UserDetailsType) => {
    dispatch({
      type: SET_USER_DETAILS,
      payload,
    });
  }, []);
  const setUserWallet = useCallback((payload?: UserWalletType) => {
    dispatch({
      type: SET_USER_WALLET,
      payload,
    });
  }, []);
  return (
    <UserContext.Provider
      value={{
        ...state,
        setUserAuthDetails,
        setUserDetails,
        setUserWallet,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw "User context must be initialized inside the component wrapped by UserProvider";
  }
  return context;
};
