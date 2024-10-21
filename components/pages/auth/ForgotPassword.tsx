import React, { useState } from "react";
import { ForgotPasswordProps } from "@/utils/types";
import AuthLayout from "@/components/Layout/AuthLayout";
import Button from "@/components/ui/form/Button";
import InputField from "@/components/general/form/InputField";
import { ForgotPasswordImg } from "@/assets/images";
import { EmailIcon } from "@/assets/icon";
import { useForm, SubmitHandler } from "react-hook-form";
import { postData } from "@/api";
import StatusMessage from "@/components/ui/StatusMessage";
import { useAuth } from "@/context/AuthContext";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
interface FormData {
  email: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  switchScreen,
  handleClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [formStatus, setFormStatus] = useState({
    message: "",
    type: "info" as "error" | "success" | "info",
  });
  const [loading, setLoading] = useState(false);
  const { savePasswordRequestToken } = useAuth();

  // Handle Forgot Password submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setFormStatus({ ...formStatus });
    setLoading(true);

    try {
      // Send request to forgot password endpoint
      const response = await postData("/password/request", {
        email: data.email,
      });

      const { message, token } = response.data;

      savePasswordRequestToken(token);
      setFormStatus({
        message,
        type: "success",
      });
      setTimeout(() => switchScreen("otp"), 1500);
    } catch (error: any) {
      const errorMessage =
        error.response?.message ||
        "An unexpected error occurred. Please try again.";
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
        <h2 className="text-3xl font-semibold">Forgot Password?</h2>
        <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <InputField
              type="email"
              placeholder="Enter your Email"
              leftIcon={<EmailIcon className="text-gray-400" />}
              {...register("email", { required: "Email is required" })}
              error={errors?.email?.message}
            />
            <div className="text-sm text-left flex gap-2">
              <p>
                <span className="text-primary">* </span>
                We will send you a message to set or reset your new password.
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full !mt-10 text-lg py-2 font-medium bg-primary text-gray-800 hover:bg-primary/80 !rounded-full"
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

export default ForgotPassword;
