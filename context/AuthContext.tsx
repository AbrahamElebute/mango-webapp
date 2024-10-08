import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  passwordRequestToken: string | null;
  verifySignature: string | null;
  savePasswordRequestToken: (token: string) => void;
  saveVerifySignature: (signature: string) => void;
  removePasswordRequestToken: () => void;
  removeVerifySignature: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [passwordRequestToken, setPasswordRequestToken] = useState<
    string | null
  >(null);
  const [verifySignature, setVerifySignature] = useState<string | null>(null);

  const savePasswordRequestToken = (newToken: string) => {
    setPasswordRequestToken(newToken);
  };
  const saveVerifySignature = (signature: string) => {
    setVerifySignature(signature);
  };

  const removePasswordRequestToken = () => {
    setPasswordRequestToken(null);
  };
  const removeVerifySignature = () => {
    setVerifySignature(null);
  };
  return (
    <AuthContext.Provider
      value={{
        passwordRequestToken,
        savePasswordRequestToken,
        removePasswordRequestToken,
        removeVerifySignature,
        saveVerifySignature,
        verifySignature,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
