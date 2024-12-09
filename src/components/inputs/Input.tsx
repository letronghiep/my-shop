"use client";
import { FormFieldProps } from "@/types/global";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React, { useEffect, useId, useState } from "react";

interface IInput extends FormFieldProps {
  size: "sm" | "md" | "lg";
  variant: "primary" | "secondary" | "danger" | "default";
  className?: string;
}

function Input({
  type = "text",
  placeholder,
  name,
  register,
  error,
  variant,
  size,
  className,
  options = {},
  label,
}: IInput) {
  const { Text } = Typography;
  const baseStyles =
    "border border-gray-300 rounded-md hover:border-blue-400 focus-within:border-blue-400";
  const sizeClasses = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "py-2.5 px-3 text-sm",
    lg: "py-3 px-3.5 text-base",
  };
  const variantClasses = {
    primary: "border-blue-400",
    secondary: "border-gray-300 text-gray-800",
    danger: "border-red-400",
    default: "border-gray-300 text-gray-800",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(options.disabled);
  const uniqueId = useId();
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(e.target.value !== "");
  };

  // Kiểm tra giá trị ban đầu của input
  useEffect(() => {
    if (options.defaultValue) {
      setHasValue(true);
    }
  }, [options.defaultValue]);

  return (
    <div className="relative">
      <div
        className={`${baseStyles} ${sizeClasses[size]} ${
          variantClasses[variant]
        } ${className} 
        ${options.disabled && "bg-neutral-100"} relative`}
      >
        <label
          onClick={() => setIsFocused(!isFocused)}
          className={`absolute left-2 transition-all duration-200 ease-linear
            ${
              isFocused || hasValue
                ? "-top-3 text-sm px-1 bg-white"
                : "top-1/2 transform -translate-y-1/2 text-base"
            } 
            ${isFocused || hasValue ? "text-blue-400" : "text-gray-400"}
            ${isFocused || hasValue ? "bg-white" : ""}`}
          htmlFor={uniqueId}
          style={{
            paddingLeft: isFocused || hasValue ? "0.25rem" : "0",
            paddingRight: isFocused || hasValue ? "0.25rem" : "0",
          }}
        >
          {label}
        </label>
        <input
          id={uniqueId}
          className="placeholder:text-gray-300 w-full h-full outline-none border-none focus:outline-none bg-inherit"
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          defaultValue={options.defaultValue}
          {...options}
          {...register(name)}
          name={name}
          onFocus={handleFocus}
          onBlur={handleBlur}
          // onChange={(e) => setHasValue(e.target.value !== "")}
        />
        {type === "password" && (
          <span
            onClick={handleTogglePassword}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? (
              <EyeOutlined className="text-blue-500" />
            ) : (
              <EyeInvisibleOutlined />
            )}
          </span>
        )}
      </div>
      {error && <Text type="danger">{error.message}</Text>}
    </div>
  );
}

export default Input;
