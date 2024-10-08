import React, { useState } from "react";
import { LoginProps } from "@/utils/types";
import AuthLayout from "@/components/Layout/AuthLayout";
import { AccountIcon } from "@/assets/icon";
import Button from "@/components/ui/form/Button";
import InputField from "@/components/general/form/InputField";
import { LoginImg } from "@/assets/images";
import { postData, setHeaderAuthorization } from "@/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { saveToken } from "@/localservices";
import useUser from "@/hooks/useUser";
import SocialButton from "./authComponents/SocialButton";
import StatusMessage from "@/components/ui/StatusMessage";
import PasswordField from "@/components/general/form/PasswordField";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ switchScreen, handleClose }) => {
  const { setUserAuthDetails, setUserDetails } = useUser();
  const [formStatus, setFormStatus] = useState({
    message: "",
    type: "info" as "error" | "success" | "info",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { email: "", password: "" } });

  // Handle login submission
  const handleLogin: SubmitHandler<FormData> = async (data) => {
    setFormStatus({ ...formStatus });
    setLoading(true);
    try {
      const { data: loginData } = await postData("/login", data);
      const token = loginData?.authentication?.token;
      saveToken(token);
      setHeaderAuthorization(token);
      setUserAuthDetails(token);
      setUserDetails(loginData?.user);
      setFormStatus({
        message: "Login successful!",
        type: "success",
      });
      setTimeout(handleClose, 1000);
    } catch (error: any) {
      const errorData =
        error.response.message ||
        "An unexpected error occurred. Please try again later.";
      setFormStatus({
        message: errorData,
        type: "error",
      });
    } finally {
      // Ensure loading is set to false
      setLoading(false);
    }
  };

  return (
    <AuthLayout onClose={handleClose} AuthImage={LoginImg}>
      <div className="p-5 space-y-8 w-full">
        <h2 className="text-3xl font-semibold">Login</h2>
        <form className="space-y-6 w-full" onSubmit={handleSubmit(handleLogin)}>
          {formStatus.message && (
            <StatusMessage
              type={formStatus.type}
              message={formStatus.message}
              clearMessage={() => setFormStatus({ ...formStatus, message: "" })}
            />
          )}

          <InputField
            type="email"
            placeholder="Email"
            leftIcon={<AccountIcon className="text-gray-400" />}
            {...register("email", { required: "Email is required" })}
            error={errors?.email?.message}
          />
          <PasswordField
            showPassword={showPassword}
            togglePassword={() => setShowPassword((prev) => !prev)}
            register={register}
            error={errors?.password?.message}
          />
          <button
            type="button"
            className="text-sm hover:text-primary ml-auto block"
            onClick={() => switchScreen("forgotPassword")}
          >
            Forgot Password?
          </button>
          <Button
            type="submit"
            disabled={loading}
            className="w-full !mt-10 text-lg py-2 font-medium bg-primary text-gray-800 hover:bg-primary/80 !rounded-full"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="text-center space-y-4">
          <p className="text-sm text-gray-500">- OR Continue with -</p>
          <SocialButton />
        </div>

        <p className="text-center text-sm">
          I don&apos;t have an account{" "}
          <button
            type="button"
            className="font-semibold underline hover:text-primary"
            onClick={() => switchScreen("register")}
          >
            Create an account
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
