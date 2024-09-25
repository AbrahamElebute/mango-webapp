import { encrypt, decrypt } from "node-encryption";

export const saveToken = async (token: string) => {
  try {
    // const encryptedToken = encrypt(token, process.env.secretKey ?? "");
    return localStorage.setItem(process.env.localStorageTokenKey ?? "", token);
  } catch (error) {}
};

export const getSavedToken = async () => {
  try {
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
  } catch (error) {}
};

export const deleteSavedToken = () => {
  try {
    return localStorage.removeItem(process.env.localStorageTokenKey ?? "");
  } catch (error) {}
};
