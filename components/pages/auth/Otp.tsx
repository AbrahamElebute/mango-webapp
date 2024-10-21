import React, { useState } from "react";
import { AuthScreenType } from "@/utils/types";
import AuthLayout from "@/components/Layout/AuthLayout";
import Button from "@/components/ui/form/Button";
import InputField from "@/components/general/form/InputField";
import { ForgotPasswordImg } from "@/assets/images";
import { EmailIcon } from "@/assets/icon";
import { postData } from "@/api";
import { useAuth } from "@/context/AuthContext";
import StatusMessage from "@/components/ui/StatusMessage";
import LoadingIndicator from "@/components/ui/LoadingIndicator";

interface OtpProps {
  switchScreen: (screen: AuthScreenType) => void;
  handleClose: () => void;
}

const Otp: React.FC<OtpProps> = ({ switchScreen, handleClose }) => {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formStatus, setFormStatus] = useState({
    message: "",
    type: "info" as "error" | "success" | "info",
  });
  const {
    passwordRequestToken,
    removePasswordRequestToken,
    saveVerifySignature,
  } = useAuth();
  // console.log("passwordRequestToken:", passwordRequestToken);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus({ ...formStatus });

    try {
      const response = await postData("/password/verify", {
        token: passwordRequestToken,
        code,
      });
      const { message, signature } = response.data;

      saveVerifySignature(signature);

      removePasswordRequestToken();

      if (response?.data) {
        setFormStatus({
          message: message,
          type: "success",
        });
        setTimeout(() => {
          switchScreen("resetPassword");
        }, 2000);
      }
    } catch (error: any) {
      const errorData =
        error.response?.data?.message || "An unexpected error occurred.";
      setFormStatus({
        message: errorData,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout onClose={handleClose} AuthImage={ForgotPasswordImg}>
      <div className="p-5 space-y-8 w-full">
        <h2 className="text-3xl font-semibold">Verify Code</h2>
        <form className="space-y-6 w-full" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <InputField
              type="text"
              placeholder="Enter code"
              leftIcon={<EmailIcon className="text-gray-400" />}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <div className="text-sm text-left">
              <p>
                <span className="text-primary">* </span>
                Please enter the verification code sent to your email.
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full text-lg py-2 font-medium bg-primary text-gray-800 hover:bg-primary/80 !rounded-full !mt-10"
          >
            {loading ? (
              <LoadingIndicator type="spinner" size="w-6 h-6" />
            ) : (
              "Submit"
            )}
          </Button>

          {formStatus.message && (
            <StatusMessage
              type={formStatus.type}
              message={formStatus.message}
              clearMessage={() => setFormStatus({ ...formStatus, message: "" })}
            />
          )}
        </form>
      </div>
    </AuthLayout>
  );
};

export default Otp;
