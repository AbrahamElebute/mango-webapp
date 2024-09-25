import React, { forwardRef } from "react";
import Label from "./Label";
import { InputFieldProps } from "@/utils/types";

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      id,
      className,
      inputClassName,
      inputParentClassName,
      formClassName,
      type,
      placeholder,
      rightIcon,
      buttonTitle,
      leftIcon,
      rightButtonTitle,
      leftButtonTitle,
      leftButtonClassName,
      rightButtonClassName,
      labelClassName,
      labelButtonClassName,
      labelButton,
      rightIconAction,
      leftIconAction,
      labelButtonAction,
      // iconProps,
      error,
      ...props
    },
    ref
  ) => {
    const handleButtonClick = (action?: () => void) => {
      if (action && typeof action === "function") {
        action();
      }
    };

    const buttonClassName = " ";
    return (
      <div className={`${className} flex flex-col gap-2`}>
        <div className={`${formClassName} flex flex-col gap-2`}>
          <div className="flex justify-between">
            {label && (
              <Label
                className={`${labelClassName} text-gray-400 font-medium`}
                htmlFor={id || label || "input-rad"}
              >
                {label}
              </Label>
            )}
            {labelButton && (
              <button
                onClick={labelButtonAction}
                className={`${labelButtonClassName}  text-gray-400 font-medium`}
              >
                {labelButton}
              </button>
            )}
          </div>

          <div
            className={`${inputParentClassName} w-full bg-[#E5E5E5] rounded-full px-4  relative flex items-stretch justify-center`}
          >
            {leftIcon && (
              <button
                onClick={() => handleButtonClick(leftIconAction)}
                className={`${leftButtonClassName || buttonClassName} left-0`}
                title={leftButtonTitle || buttonTitle || "button"}
              >
                {leftIcon}
              </button>
            )}
            <input
              {...props}
              title={label}
              id={id || label || "input-rad"}
              ref={ref}
              type={type || "text"}
              placeholder={placeholder || label || "Input field"}
              className={`peer/radio-btn bg-transparent p-3 outline-none  w-full h-full ${inputClassName} placeholder:text-[#000000B2]`}
            />

            {rightIcon && (
              <button
                onClick={() => handleButtonClick(rightIconAction)}
                className={`${rightButtonClassName || buttonClassName} right-0`}
                title={rightButtonTitle || buttonTitle || "button"}
              >
                {rightIcon}
              </button>
            )}
          </div>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "Input field";

export default InputField;
