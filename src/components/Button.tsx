"use client";
import Link from "next/link";
import { ReactNode } from "react";

interface IButton {
  children: ReactNode;
  size: "sm" | "md" | "lg";
  variant: "primary" | "secondary" | "danger" | "default";
  href?: string;
  onClick?: () => void;
  className?: string;
  leftIcon?: any;
  rightIcon?: any;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

function Button({
  children,
  size,
  variant,
  href,
  onClick,
  className,
  leftIcon,
  rightIcon,
  type,
  disabled,
}: IButton) {
  const baseStyles =
    "rounded focus:bg-gray-200 focus:outline-none transition-all linear active:bg-gray-50  duration-150 flex";
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-1.5 text-base",
    lg: "px-6 py-2 text-[18px]",
  };
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    default:
      "bg-white hover:bg-gray-50  transition-all duration-150 duration-300 ease-out text-black border border-neutral-800/50",
  };

  const buttonContent = (
    <span
      className={`${baseStyles} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
  if (href) {
    return (
      <Link href={href} passHref>
        {buttonContent}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseStyles} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
    >
      {leftIcon && leftIcon}
      {children}
      {rightIcon && rightIcon}
    </button>
  );
}

export default Button;
