import React, { useState } from "react";
import Button from "@/components/ui/form/Button";
import { AuthScreenType } from "@/utils/types";
import AuthLayout from "@/components/Layout/AuthLayout";
import { ForgotPasswordImg } from "@/assets/images";
import { useForm, SubmitHandler } from "react-hook-form";
import { postData } from "@/api";
import { useAuth } from "@/context/AuthContext";
import StatusMessage from "@/components/ui/StatusMessage";
import PasswordField from "@/components/general/form/PasswordField";

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordProps {
  switchScreen: (screen: AuthScreenType) => void;
  handleClose: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
  switchScreen,
  handleClose,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formStatus, setFormStatus] = useState({
    message: "",
    type: "info" as "error" | "success" | "info",
  });
  const { verifySignature } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const handleResetPassword: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setFormStatus({ message: "", type: "info" });

    try {
      const response = await postData("/password", {
        signature: verifySignature,
        password: data.newPassword,
        password_confirmation: data.confirmPassword,
      });

      setFormStatus({
        message: response.data.message || "Password reset successful!",
        type: "success",
      });

      setTimeout(() => {
        switchScreen("login");
      }, 2000);
    } catch (error: any) {
      const errorMessage =
        error.response?.message ||
        "An error occurred while resetting password.";
      setFormStatus({
        message: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout onClose={handleClose} AuthImage={ForgotPasswordImg}>
      <div className="p-5 space-y-8 w-full">
        <h2 className="text-3xl font-semibold">Reset Password</h2>
        <form
          className="space-y-6 w-full"
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <PasswordField
            name="newPassword"
            showPassword={showPassword}
            togglePassword={() => setShowPassword((prev) => !prev)}
            register={register}
            placeholder="Enter new password"
            error={errors.newPassword?.message}
          />

          <PasswordField
            name="confirmPassword"
            showPassword={showConfirmPassword}
            togglePassword={() => setShowConfirmPassword((prev) => !prev)}
            register={register}
            placeholder="Confirm new password"
            error={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full text-lg py-2 font-medium bg-primary text-gray-800 hover:bg-primary/80 !rounded-full !mt-10"
          >
            {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
