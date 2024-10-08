import React from "react";
import UserProvider from "./UserContext";
import { ModalProvider } from "./ModalContext";
import { AuthProvider } from "./AuthContext";

const ContextWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <UserProvider>
      <AuthProvider>
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>
    </UserProvider>
  );
};

export default ContextWrapper;
