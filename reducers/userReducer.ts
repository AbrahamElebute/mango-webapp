import { UserDetailsType, UserWalletType } from "@/api/index.d";
import {
  SET_AUTH_DETAILS,
  SET_USER_DETAILS,
  SET_USER_WALLET,
  UserActionType,
} from "@/utils/_enums";

export type UserInitialValueType = {
  userAuthDetails: string | null;
  userDetails: UserDetailsType | null;
  userWallet: UserWalletType | null;
};

export const userInitialValue: UserInitialValueType = {
  userAuthDetails: null,
  userDetails: null,
  userWallet: null,
};

export const userReducer = (
  state: UserInitialValueType,
  action: {
    type: UserActionType;
    payload?: any;
  }
): UserInitialValueType => {
  const { type, payload } = action || {};
  switch (type) {
    case SET_USER_DETAILS:
      return { ...state, userDetails: payload };
    case SET_AUTH_DETAILS:
      return { ...state, userAuthDetails: payload };
    case SET_USER_WALLET:
      return { ...state, userWallet: payload };
    default:
      return state;
  }
};
