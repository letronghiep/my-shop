"use client";
import { FormFieldProps } from "@/types/global";
import { Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

interface IInputProps extends FormFieldProps {}

function InputCustom({ control, name, label, type }: IInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          {type === "password" ? (
            <Input.Password {...field} placeholder={label} />
          ) : (
            <Input placeholder={label} {...field} />
          )}
          {fieldState.error && (
            <span style={{ color: "red", display: "block" }}>
              {fieldState.error.message}
            </span>
          )}
        </>
      )}
    ></Controller>
  );
}

export default InputCustom;
