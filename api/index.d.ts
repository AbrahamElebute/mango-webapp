export interface LoginBodyType {
  email?: string;
  password?: string;
}

export interface UserAuthDetailsType {
  accessToken: string;
  address: string;
  companyName: string | null;
  expiredAt: number;
  refreshToken: string | null;
  userID: string;
}

export interface RegisterBodyType {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  acceptTerms?: boolean;
  newsletter?: boolean;
}

export type OTPTypes = "sms" | "email";

export interface SendOTPBodyType {
  signature?: string | null;
}
export interface SendChangePasswordOTPType {
  email?: string;
}

export interface SetPinBodyType {
  pin?: string;
}
export interface UserDetailsType {
  id: string;
  avatar: string;
  code: string;
  email: string;
  has_info: boolean;
  has_next_of_kin: boolean;
  suspended: boolean;
  email_verified: boolean;
  first_name: string;
  last_name: string;
  name: string;
  username: string;
  settings: {
    two_factor_authentication: false;
  };
}

export interface UserWalletType {
  balance: {
    amount: string;
    display: string;
    whole: string;
    symbol: string;
    currency: string;
  };
  gift_earnings: {
    amount: string;
    display: string;
    whole: string;
    symbol: string;
    currency: string;
  };
  all_gift_earnings: {
    amount: string;
    display: string;
    whole: string;
    symbol: string;
    currency: string;
  };
  sell_rate: number;
  purchase_rate: number;
  minimum_purchase: {
    amount: string;
    display: string;
    whole: string;
    symbol: string;
    currency: string;
  };
  minimum_cachout: {
    amount: string;
    display: string;
    whole: string;
    symbol: string;
    currency: string;
  };
}

export interface LoginResponseType {
  hasError: boolean;
  message: "success" | "error";
  time: Date;
  data: UserAuthDetailsType;
}

export interface SignUpResponseType {
  phoneNumber?: string;
}
export interface SendResetPasswordResponeType {
  message?: string;
  token?: string;
  expires_at?: number;
}
export interface VerifyOTPBodyType {
  code?: string;
  token?: string | null;
}
export interface ResetPasswordBodyType {
  password?: string;
  password_confirmation?: string;
}
export interface StartCardType {
  label?: string;
}
export interface ErrorResponseType {
  message?: string;
  timeStamp?: Date;
  status?: string;
  url?: string;
}
export interface WalletFundType {
  card_id?: string;
  amount?: number;
  remarks?: string;
}

export type AllBodyType = LoginBodyType &
  SendOTPBodyType &
  RegisterBodyType &
  VerifyOTPBodyType &
  ResetPasswordBodyType &
  SendChangePasswordOTPType &
  SendOTPBodyType &
  StartCardType &
  WalletFundType;

export type AllResponseType = ErrorResponseType &
  AllBodyType &
  LoginResponseType &
  SignUpResponseType &
  SendResetPasswordResponeType;

export type AllRequestType = "post" | "get" | "delete" | "put" | "patch";

export type ResponseStatus = string;

export interface ApiURLType {
  method: AllRequestType;
  url: string;
  returnToken?: boolean;
}

export interface ResponseType {
  type: ResponseStatus;
  code: string | number;
  authId: string | null;
  statusText: string;
  data:
    | ({
        message: string;
        time: string;
        data: AllResponseType;
        customerDTO: AllResponseType;
        hasError: boolean;
      } & AllResponseType)
    | any;
}
export interface ApiErrorResponseType {
  type: ResponseStatus;
  code: string | number;
  statusText: string;
  response: AllResponseType;
}

export type ApiRequestResponseType = Promise<ResponseType>;
