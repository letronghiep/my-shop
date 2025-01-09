"use client";
import { FormFieldProps } from "@/types/global";
import { Checkbox, Form } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

interface ICheckbox extends FormFieldProps {
  className?: string;
  disabled?: boolean;
}

function CheckboxCustom({ name, control, label, disabled = false }: ICheckbox) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          <Checkbox {...field} disabled={disabled} checked={field.value}>
            {label}
          </Checkbox>{" "}
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

export default CheckboxCustom;
