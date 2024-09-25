import React from "react";
import Modal from "@/components/ui/modal/Modal";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import { AuthScreenType } from "@/utils/types";
import Otp from "./Otp";
import ResetPassword from "./ResetPassword";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: AuthScreenType;
  switchScreen: (screen: AuthScreenType) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentScreen,
  switchScreen,
}) => {
  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return <Login switchScreen={switchScreen} handleClose={onClose} />;
      case "register":
        return <Register switchScreen={switchScreen} handleClose={onClose} />;
      case "forgotPassword":
        return (
          <ForgotPassword switchScreen={switchScreen} handleClose={onClose} />
        );
      case "otp":
        return <Otp switchScreen={switchScreen} handleClose={onClose} />;
      case "resetPassword":
        return (
          <ResetPassword switchScreen={switchScreen} handleClose={onClose} />
        );
      default:
        return null;
    }
  };

  return (
    <Modal opened={isOpen} onClose={onClose}>
      {renderScreen()}
    </Modal>
  );
};

export default AuthModal;
