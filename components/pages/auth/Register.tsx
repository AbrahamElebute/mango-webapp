import React, { useState } from "react";
import { RegisterProps } from "@/utils/types";
import AuthLayout from "@/components/Layout/AuthLayout";
import { AccountIcon } from "@/assets/icon";
import Button from "@/components/ui/form/Button";
import InputField from "@/components/general/form/InputField";
import { RegisterImg } from "@/assets/images";
import CheckBox from "@/components/general/form/CheckBox";
import { useForm, SubmitHandler } from "react-hook-form";
import { postData, setHeaderAuthorization } from "@/api";
import { saveToken } from "@/localservices";
import useUser from "@/hooks/useUser";
import PasswordField from "@/components/general/form/PasswordField";
import AuthSocialButtons from "./authComponents/AuthSocialButtons";
import StatusMessage from "@/components/ui/StatusMessage";
import LoadingIndicator from "@/components/ui/LoadingIndicator";

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  acceptTerms: boolean;
  newsletter: boolean;
}

const initialValue: FormData = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  acceptTerms: true,
  newsletter: true,
};

const Register: React.FC<RegisterProps> = ({ switchScreen, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const { setUserAuthDetails, setUserDetails } = useUser();
  const [formStatus, setFormStatus] = useState({
    message: "",
    type: "info" as "error" | "success" | "info",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: initialValue });

  // Handle Register submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formattedData = {
      first_name: data.firstName,
      last_name: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
      accept_terms: data.acceptTerms,
      newsletter: data.newsletter,
    };
    setFormStatus({ ...formStatus });
    setLoading(true);
    try {
      const response = await postData("/register", formattedData);
      const { data: regData } = response || {};
      const token = regData?.authentication?.token;
      saveToken(token);
      setHeaderAuthorization(token);
      setUserAuthDetails(token);
      setUserDetails(regData?.user);
      setFormStatus({
        message: "Registration successful!",
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
      setLoading(false);
    }
  };

  return (
    <AuthLayout onClose={handleClose} AuthImage={RegisterImg}>
      <div className="p-5 space-y-8 w-full">
        <h2 className="text-3xl font-semibold">Signup</h2>
        <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="text"
            placeholder="First Name"
            leftIcon={<AccountIcon className="text-gray-400" />}
            {...register("firstName", { required: "First Name is required" })}
            error={errors?.firstName?.message}
          />
          <InputField
            type="text"
            placeholder="Last Name"
            leftIcon={<AccountIcon className="text-gray-400" />}
            {...register("lastName", { required: "Last Name is required" })}
            error={errors?.lastName?.message}
          />
          <InputField
            type="text"
            placeholder="Username"
            leftIcon={<AccountIcon className="text-gray-400" />}
            {...register("username", { required: "Username is required" })}
            error={errors?.username?.message}
          />
          <InputField
            type="email"
            placeholder="Email"
            leftIcon={<AccountIcon className="text-gray-400" />}
            {...register("email", { required: "Email is required" })}
            error={errors?.email?.message}
          />
          <PasswordField
            name="password"
            showPassword={showPassword}
            togglePassword={() => setShowPassword((prev) => !prev)}
            register={register}
            error={errors?.password?.message}
          />
          <PasswordField
            name="passwordConfirmation"
            showPassword={showConfirmPassword}
            placeholder="Confirm Password"
            togglePassword={() => setShowConfirmPassword((prev) => !prev)}
            register={register}
            error={errors?.passwordConfirmation?.message}
          />
          <div className="space-y-2">
            <div className="text-sm text-left flex gap-2">
              <CheckBox required {...register("acceptTerms")} />
              <p>
                By clicking the <span className="text-primary">Register</span>{" "}
                button, you agree to the <br /> public offer
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            className="w-full text-lg"
            disabled={loading}
          >
            {loading ? (
              <LoadingIndicator type="spinner" size="w-6 h-6" />
            ) : (
              "Create an account"
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

        <div className="text-center space-y-4">
          <p className="text-sm text-gray-500">- OR Continue with -</p>
          <AuthSocialButtons />
        </div>

        <p className="text-center text-sm">
          I don&apos;t have an account{" "}
          <button
            type="button"
            className="font-semibold underline hover:text-primary"
            onClick={() => switchScreen("login")}
          >
            Login
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
