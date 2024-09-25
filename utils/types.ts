import React from "react";
import { HTMLProps } from "react";

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
