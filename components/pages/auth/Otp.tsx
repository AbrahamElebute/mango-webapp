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

const Otp: React.FC<ForgotPasswordProps> = ({ switchScreen, handleClose }) => {
  return (
    <AuthLayout onClose={handleClose} AuthImage={ForgotPasswordImg}>
      <div className="p-5 space-y-8 w-full">
        <h2 className="text-3xl font-semibold">Verify code</h2>
        <form className="space-y-6 w-full">
          <div className="space-y-2">
            <InputField
              type="email"
              placeholder="Enter code"
              leftIcon={<EmailIcon className="text-gray-400" />}
            />
          </div>

          <Button
            type="submit"
            onClick={() => switchScreen("resetPassword")}
            className="w-full text-lg py-2 font-medium bg-primary text-gray-800 hover:bg-primary/80 !rounded-full !mt-10"
          >
            Submit
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Otp;
