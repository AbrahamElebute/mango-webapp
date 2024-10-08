import React from "react";
import InputField from "./InputField";
import { EyeIcon, EyeOffIcon, LockIcon } from "@/assets/icon";

const PasswordField: React.FC<{
  showPassword: boolean;
  togglePassword: () => void;
  register: any;
  error?: string;
  required?: string;
  placeholder?: string;
  name?: string;
}> = ({
  showPassword,
  togglePassword,
  register,
  error,
  placeholder,
  required,
  name,
}) => (
  <InputField
    type={showPassword ? "text" : "password"}
    placeholder={placeholder || "Password"}
    leftIcon={<LockIcon />}
    rightIcon={
      showPassword ? (
        <EyeIcon onClick={togglePassword} />
      ) : (
        <EyeOffIcon onClick={togglePassword} />
      )
    }
    {...register(name, { required: `${name} is required` })}
    error={error}
  />
);
export default PasswordField;
