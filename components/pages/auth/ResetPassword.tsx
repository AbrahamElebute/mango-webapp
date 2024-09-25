import React from "react";
import Button from "@/components/ui/form/Button";
import InputField from "@/components/general/form/InputField";
import { AuthScreenType } from "@/utils/types";
import AuthLayout from "@/components/Layout/AuthLayout";
import { ForgotPasswordImg } from "@/assets/images";
import { EyeIcon, LockIcon } from "@/assets/icon";

interface ResetPasswordProps {
  switchScreen: (screen: AuthScreenType) => void;
  handleClose: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
  switchScreen,
  handleClose,
}) => {
  return (
    <AuthLayout onClose={handleClose} AuthImage={ForgotPasswordImg}>
      <div className="p-5 space-y-8 w-full">
        <h2 className="text-3xl font-semibold">Reset Password</h2>
        <form className="space-y-6 w-full">
          <div className="space-y-2">
            <InputField
              type="email"
              placeholder="Enter code"
              leftIcon={<LockIcon className="text-gray-400" />}
              rightIcon={<EyeIcon />}
            />
            <InputField
              type="email"
              placeholder="Enter code"
              leftIcon={<LockIcon className="text-gray-400" />}
              rightIcon={<EyeIcon />}
            />
          </div>

          <Button
            type="submit"
            onClick={handleClose}
            className="w-full text-lg py-2 font-medium bg-primary text-gray-800 hover:bg-primary/80 !rounded-full !mt-10"
          >
            Reset password
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
