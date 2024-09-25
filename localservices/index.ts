export const saveToken = async (token: string) => {
  // const encryptedToken = encrypt(token, process.env.secretKey ?? "");
  return localStorage.setItem(process.env.localStorageTokenKey ?? "", token);
};

export const getSavedToken = async () => {
  const savedToken = localStorage.getItem(
    process.env.localStorageTokenKey ?? ""
  );
  // if (savedToken) {
  //   const decryptedToken = decrypt(savedToken, process.env.secretKey ?? "");
  //   if (decryptedToken) {
  //     token = decryptedToken?.toString();
  //   }
  // }
  return savedToken ?? null;
};

export const deleteSavedToken = () => {
  return localStorage.removeItem(process.env.localStorageTokenKey ?? "");
};
