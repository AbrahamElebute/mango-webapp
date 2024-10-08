export const APP_LOADED = "APP_LOADED",
  SET_COLOR_SCHEME = "SET_COLOR_SCHEME",
  SET_HELP_CONTENT = "SET_HELP_CONTENT";

export type ActionsType =
  | "APP_LOADED"
  | "SET_COLOR_SCHEME"
  | "SET_HELP_CONTENT";

export const SET_USER_DETAILS = "SET_USER_DETAILS",
  SET_AUTH_DETAILS = "SET_AUTH_DETAILS",
  SET_STAFFS_DETAILS = "SET_STAFFS_DETAILS";

export type UserActionType =
  | "SET_USER_DETAILS"
  | "SET_AUTH_DETAILS"
  | "SET_STAFFS_DETAILS"
  | "SET_USER_WALLET";

export const SET_USER_WALLET = "SET_USER_WALLET";

export type StatusType = "error" | "success" | "info";
