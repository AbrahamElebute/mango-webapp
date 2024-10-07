import { RouteType } from "./types";
import { convertObjectToArray } from "./_functions";
import {
  GoogleIcon,
  TiktokIcon,
  TwitchIcon,
  FacebookIcon,
  AppleIcon,
} from "@/assets/icon";

export const siteName = "Mango Entertainment",
  SEODescription = "",
  defaultImage = "",
  defaultImageDescription = "",
  authorName = "",
  siteUrl = "",
  handle = "";

export const navbar = "navbar",
  Routes: { [name: string]: RouteType } = {
    Home: {
      Icon: undefined,
      path: "/",
      label: "Home",
      showIn: [navbar],
      type: "link",
      activeIn: ["/"],
      subRoutes: {},
    },
    Games: {
      Icon: undefined,
      path: "/games",
      label: "Gaming",
      showIn: [navbar],
      type: "link",
      activeIn: ["/games"],
      subRoutes: {},
    },
    App: {
      Icon: undefined,
      path: "/",
      label: "App",
      showIn: [navbar],
      type: "link",
      activeIn: ["/app"],
      subRoutes: {},
    },
    Recharge: {
      Icon: undefined,
      path: "/recharge",
      label: "Recharge",
      showIn: [navbar],
      type: "link",
      activeIn: ["/recharge"],
      subRoutes: {},
    },
  },
  socialIcons = [
    { icon: GoogleIcon, name: "Google" },
    { icon: TiktokIcon, name: "TikTok" },
    { icon: TwitchIcon, name: "Twitch" },
    { icon: FacebookIcon, name: "Facebook" },
    { icon: AppleIcon, name: "Apple" },
  ],
  allRoutes = convertObjectToArray(Routes),
  navRoutes = allRoutes.filter((link) => link.showIn.includes(navbar));
