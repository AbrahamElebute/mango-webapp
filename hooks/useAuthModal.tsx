import { useState } from "react";
import { AuthScreenType } from "../utils/types";

export const useAuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<AuthScreenType>("login");

  const openModal = (screen: AuthScreenType = "login") => {
    setCurrentScreen(screen);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const switchScreen = (screen: AuthScreenType) => {
    setCurrentScreen(screen);
  };

  return { isOpen, currentScreen, openModal, closeModal, switchScreen };
};
