import React, { forwardRef } from "react";
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftIconAction?: () => void;
  rightIconAction?: () => void;
  containerClassName?: string;
  inputContainerClassName?: string;
  inputClassName?: string;
  iconClassName?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      leftIconAction,
      rightIconAction,
      containerClassName = "",
      inputContainerClassName = "",
      inputClassName = "",
      iconClassName = "",
      id,
      ...inputProps
    },
    ref
  ) => {
    const handleIconClick = (action?: () => void) => {
      if (action) {
        action();
      }
    };

    return (
      <div className={`flex flex-col gap-2 ${containerClassName}`}>
        <div
          className={`relative flex items-center ${inputContainerClassName}`}
        >
          {leftIcon && (
            <span
              onClick={() => handleIconClick(leftIconAction)}
              className={`absolute left-3 ${iconClassName}`}
            >
              {leftIcon}
            </span>
          )}
          <input
            {...inputProps}
            id={id || "input-field"}
            ref={ref}
            className={`w-full p-3 bg-[#E5E5E5] rounded-full outline-none ${
              leftIcon ? "pl-10" : ""
            } ${rightIcon ? "pr-10" : ""} ${inputClassName}`}
          />
          {rightIcon && (
            <span
              onClick={() => handleIconClick(rightIconAction)}
              className={`absolute right-3 cursor-pointer ${iconClassName}`}
            >
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
