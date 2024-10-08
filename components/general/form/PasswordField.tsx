import React from "react";
import InputField from "./InputField";
import { EyeIcon, EyeOffIcon, LockIcon } from "@/assets/icon";

const PasswordField: React.FC<{
  showPassword: boolean;
  togglePassword: () => void;
  register: any;
  error?: string;
}> = ({ showPassword, togglePassword, register, error }) => (
  <InputField
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    leftIcon={<LockIcon className="text-gray-400" />}
    rightIcon={
      showPassword ? (
        <EyeIcon onClick={togglePassword} />
      ) : (
        <EyeOffIcon onClick={togglePassword} />
      )
    }
    {...register("password", { required: "Password is required" })}
    error={error}
  />
);
export default PasswordField;
