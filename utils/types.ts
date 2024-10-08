import React from "react";
import { HTMLProps } from "react";
import { StatusType } from "./_enums";

export type IconProps = {
  size?: number;
  width?: number;
  height?: number;
  active?: boolean;
  color?: string;
  colorTwo?: string;
  className?: string;
} & React.SVGProps<SVGSVGElement>;

export type LabelProps = {
  children: React.ReactNode;
} & HTMLProps<HTMLLabelElement>;

export type IconType = React.FC<IconProps>;

export type RouteType = {
  path: string;
  Icon: undefined | IconType;
  showIn: string[];
  label: string;
  type: "link" | "hash";
  activeIn: string[];
  subRoutes: undefined | object;
};

export type InputElementProps = {
  label?: React.ReactNode;
  inputClassName?: string;
  inputParentClassName?: string;
  formClassName?: string;
  labelClassName?: string;
  error?: string;
} & HTMLProps<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

export type InputFieldProps = {
  rightIcon?: React.ReactNode;
  buttonTitle?: string;
  leftIcon?: React.ReactNode;
  rightButtonTitle?: string;
  leftButtonClassName?: string;
  rightButtonClassName?: string;
  leftButtonTitle?: string;
  rightIconAction?: () => void;
  leftIconAction?: () => void;
  labelButtonAction?: () => void;
  iconProps?: IconProps;
  labelButton?: React.ReactNode;
  labelButtonClassName?: string;
} & InputElementProps;

export type AuthScreenType =
  | "login"
  | "register"
  | "forgotPassword"
  | "resetPassword"
  | "otp"
  | "resetPassword";

export type NavBarItemProps = {
  route: RouteType;
  isMoblie?: boolean;
};
export interface NavBarProps {
  logoColor: string;
  headerStyle: string;
  headerBtnStyle: string;
}
export interface UserAvatarProps {
  loading?: boolean;
  avatar?: string;
  className?: string;
}
export interface RechargeOptionProps {
  coins: number;
  price: number;
}
export interface PlaceholderStateProps {
  title: string;
  description?: string;
  lottie?: object;
  buttonText?: string;
  onButtonClick?: any;
}
export interface MobileMenuProps {
  userAuthDetails: any;
  loadingUserDetails: boolean;
  userDetails: any;
  toggleMobileMenu: () => void;
  openModal: any;
}
export interface StatusMessageProps {
  type: StatusType;
  message: string;
  clearMessage: () => void;
  duration?: number;
}
export interface LoginProps {
  switchScreen: (screen: AuthScreenType) => void;
  handleClose: () => void;
}
export interface RegisterProps {
  switchScreen: (screen: AuthScreenType) => void;
  handleClose: () => void;
}
export interface ForgotPasswordProps {
  switchScreen: (screen: AuthScreenType) => void;
  handleClose: () => void;
}
