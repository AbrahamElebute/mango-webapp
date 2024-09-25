export interface LoginBodyType {
  emailO?: string;
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
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  acceptTerms: boolean;
  newsletter: boolean;
}

export type OTPTypes = "sms" | "email";

export interface SendOTPBodyType {
  identifier?: string;
  otpType?: OTPTypes;
  verificationType?: string;
}
export interface SendChangePasswordOTPType {
  phoneNumber?: string;
}

export interface SetPinBodyType {
  pin?: string;
}
export interface UserDetailsType {
  email: string;
  address: string;
  state: string | null;
  phoneNumber: string;
  id: number;
  fullName: string;
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
export interface VerifyOTPBodyType {
  phoneNumber?: string;
  otp?: string;
}
export interface ResetPasswordBodyType {
  password?: string;
}

export interface ErrorResponseType {
  message?: string;
  timeStamp?: Date;
  status?: string;
  url?: string;
}

export type AllBodyType = LoginBodyType &
  SendOTPBodyType &
  RegisterBodyType &
  VerifyOTPBodyType &
  ResetPasswordBodyType &
  SendChangePasswordOTPType &
  SendOTPBodyType;

export type AllResponseType = ErrorResponseType &
  AllBodyType &
  LoginResponseType &
  SignUpResponseType;

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
