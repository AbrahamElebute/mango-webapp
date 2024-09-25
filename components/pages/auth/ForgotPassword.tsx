import React from "react";
import { AuthScreenType } from "@/utils/types";
import AuthLayout from "@/components/Layout/AuthLayout";
import Button from "@/components/ui/form/Button";
import InputField from "@/components/general/form/InputField";
import { ForgotPasswordImg } from "@/assets/images";
import { EmailIcon } from "@/assets/icon";

interface ForgotPasswordProps {
  switchScreen: (screen: AuthScreenType) => void;
  handleClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  switchScreen,
  handleClose,
}) => {
  return (
    <AuthLayout onClose={handleClose} AuthImage={ForgotPasswordImg}>
      <div className="p-5 space-y-8 w-full">
        <h2 className="text-3xl font-semibold">Forgot Passowrd?</h2>
        <form className="space-y-6 w-full">
          <div className="space-y-2">
            <InputField
              type="email"
              placeholder="Enter your Email"
              leftIcon={<EmailIcon className="text-gray-400" />}
            />
            <div className="text-sm text-left flex gap-2">
              <p>
                <span className="text-primary">* </span>
                We will send you a message to set or reset your new password
              </p>
            </div>
          </div>

          <Button
            type="submit"
            onClick={() => switchScreen("otp")}
            className="w-full !mt-10 text-lg py-2 font-medium bg-primary text-gray-800 hover:bg-primary/80 !rounded-full"
          >
            Submit
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
