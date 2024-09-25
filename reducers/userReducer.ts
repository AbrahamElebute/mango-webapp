import { UserDetailsType } from "@/api/index.d";
import {
  SET_AUTH_DETAILS,
  SET_USER_DETAILS,
  UserActionType
} from "@/utils/_enums";

export type UserInitialValueType = {
  userAuthDetails: string | null;
  userDetails: UserDetailsType | null;
};

export const userInitialValue: UserInitialValueType = {
  userAuthDetails: null,
  userDetails: null
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
    default:
      return state;
  }
};
