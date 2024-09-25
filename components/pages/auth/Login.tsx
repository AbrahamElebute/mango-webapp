import React, { useState } from "react";
import { AuthScreenType } from "@/utils/types";
import AuthLayout from "@/components/Layout/AuthLayout";
import {
  AccountIcon,
  EyeIcon,
  LockIcon,
  GoogleIcon,
  TiktokIcon,
  TwitchIcon,
  FacebookIcon,
  AppleIcon
} from "@/assets/icon";
import Button from "@/components/ui/form/Button";
import InputField from "@/components/general/form/InputField";
import { LoginImg } from "@/assets/images";
// import { useRouter } from "next/router";
import { postData, setHeaderAuthorization } from "@/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { saveToken } from "@/localservices";
import useUser from "@/hooks/useUser";

interface LoginProps {
  switchScreen: (screen: AuthScreenType) => void;
  handleClose: () => void;
}

interface FormData {
  email: string;
  password: string;
}
const initialValue: FormData = {
  email: "",
  password: ""
};

const Login: React.FC<LoginProps> = ({ switchScreen, handleClose }) => {
  const [loading, setLoading] = useState(false);
  // const router = useRouter();
  const { setUserAuthDetails, setUserDetails } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ defaultValues: initialValue });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      const responseData = await postData("/login", data);
      const { data: loginData } = responseData || {};
      const token = loginData?.authentication?.token;
      const userDetails = loginData?.user;
      saveToken(token);
      setHeaderAuthorization(token);
      setUserAuthDetails(token);
      setUserDetails(userDetails);
      handleClose();
    } finally {
      setLoading(false);
    }
  };

  const socialIcons = [
    { icon: <GoogleIcon />, name: "Google" },
    { icon: <TiktokIcon />, name: "TikTok" },
    { icon: <TwitchIcon />, name: "Twitch" },
    { icon: <FacebookIcon />, name: "Facebook" },
    { icon: <AppleIcon />, name: "Apple" }
  ];

  return (
    <AuthLayout onClose={handleClose} AuthImage={LoginImg}>
      <div className="p-5 space-y-8 w-full">
        <h2 className="text-3xl font-semibold">Login</h2>
        <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="email"
            placeholder="Username"
            leftIcon={<AccountIcon className="text-gray-400" />}
            {...register("email", { required: "Email is required" })}
            error={errors?.email?.message}
          />
          <div className="space-y-2">
            <InputField
              type="password"
              placeholder="Password"
              leftIcon={<LockIcon className="text-gray-400" />}
              rightIcon={<EyeIcon className="text-gray-400 cursor-pointer" />}
              {...register("password", { required: "Password is required" })}
              error={errors?.password?.message}
            />
            <button
              type="button"
              className="text-sm hover:text-primary ml-auto block"
              onClick={() => switchScreen("forgotPassword")}
            >
              Forgot Password?
            </button>
          </div>

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
          <div className="flex items-center justify-between">
            {socialIcons.map(({ icon, name }, index) => (
              <button
                key={index}
                className="h-12 w-12 border-2 border-primary rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                aria-label={`Login with ${name}`}
              >
                {icon}
              </button>
            ))}
          </div>
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
