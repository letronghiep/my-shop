"use client";
import { FormFieldProps } from "@/types/global";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React, { useState } from "react";
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
}: IInput) {
  const { Text } = Typography;
  const baseStyles =
    "border border-gray-300 rounded-md hover:border-blue-400 focus-within:border-blue-400";
  const sizeClasses = {
    sm: " px-2.5 py-1.5 text-sm",
    md: "py-3 px-2 text-base",
    lg: "py-3.5 px-2.5 text-lg",
  };
  const variantClasses = {
    primary: "border-blue-400",
    secondary: "border-gray-300 text-gray-800",
    danger: "border-red-400",
    default: "border-gray-300 text-gray-800",
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };
  return (
    <>
      <div
        className={`${baseStyles} ${sizeClasses[size]} ${variantClasses[variant]} ${className} relative`}
      >
        <input
          className="placeholder:text-gray-300 w-full h-full outline-none border-none focus:outline-none"
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          {...register(name)}
        />
        {type === "password" && (
          <span
            onClick={handleTogglePassword}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? <EyeOutlined className="text-blue-500" /> : <EyeInvisibleOutlined />}
          </span>
        )}
      </div>
      {error && <Text type="danger">{error.message}</Text>}
    </>
  );
}

export default Input;
