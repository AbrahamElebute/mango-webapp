import React, { useState, useEffect } from "react";
import { AuthScreenType } from "@/utils/types";
import AuthLayout from "@/components/Layout/AuthLayout";
import { AccountIcon, EyeIcon, LockIcon } from "@/assets/icon";
import Button from "@/components/ui/form/Button";
import InputField from "@/components/general/form/InputField";
import { RegisterImg } from "@/assets/images";
import CheckBox from "@/components/general/form/CheckBox";
import { socialIcons } from "@/utils/variables";
import { useForm, SubmitHandler } from "react-hook-form";
import { postData, setHeaderAuthorization } from "@/api";
import { useRouter } from "next/router";
import { saveToken } from "@/localservices";
import useUser from "@/hooks/useUser";

interface RegisterProps {
  switchScreen: (screen: AuthScreenType) => void;
  handleClose: () => void;
}

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
  const router = useRouter();
  const { setUserAuthDetails } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: initialValue });

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

    setLoading(true);
    try {
      const response = await postData("/register", formattedData);
      const { data: loginData } = responseData || {};
      saveToken(JSON.stringify(loginData));
      setHeaderAuthorization(loginData.accessToken);
      setUserAuthDetails(loginData);
      handleClose();
    } catch (error: any) {
      console.error("Registration error:", error);
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
          <InputField
            type="password"
            placeholder="Password"
            leftIcon={<LockIcon className="text-gray-400" />}
            rightIcon={<EyeIcon className="text-gray-400 cursor-pointer" />}
            {...register("password", { required: "Password is required" })}
            error={errors?.password?.message}
          />
          <div className="space-y-2">
            <InputField
              type="password"
              placeholder="Confirm Password"
              leftIcon={<LockIcon className="text-gray-400" />}
              rightIcon={<EyeIcon className="text-gray-400 cursor-pointer" />}
              {...register("passwordConfirmation", {
                required: "Password confirmation is required",
              })}
              error={errors?.passwordConfirmation?.message}
            />
            <div className="text-sm text-left flex gap-2">
              <CheckBox {...register("acceptTerms")} />
              <p>
                By clicking the <span className="text-primary">Register</span>{" "}
                button, you agree to the <br /> public offer
              </p>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full text-lg py-2 font-medium bg-primary text-gray-800 hover:bg-primary/80 !rounded-full"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create an account"}
          </Button>
        </form>

        <div className="text-center space-y-4">
          <p className="text-sm text-gray-500">- OR Continue with -</p>
          <div className="flex items-center justify-between">
            {socialIcons.map(({ icon: Icon, name }, index) => (
              <button
                key={index}
                className="h-12 w-12 border-2 border-primary rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                aria-label={`Login with ${name}`}
              >
                <Icon />
              </button>
            ))}
          </div>
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
