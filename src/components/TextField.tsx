"use client";
import { FormFieldProps } from "@/types/global";
import React, { useId } from "react";

interface FieldInfoType extends FormFieldProps {
  value?: string;
  enableEdit?: boolean;
  allowEdit?: boolean;
  title?: string;
  label?: string;
  checked?: boolean;
}

function TextField({
  value,
  enableEdit,
  allowEdit,
  title,
  placeholder,
  register,
  type = "text",
  name,
  label,
  checked,
}: FieldInfoType) {
  const inputId = useId();
  return (
    <div className="flex items-center w-full">
      <h2 className="w-max flex-1">{title}</h2>
      {enableEdit ? (
        <div
          className={`w-full flex-1 px-2 py-1.5 rounded-md ${
            type === "radio"
              ? "flex items-center gap-x-2"
              : "border border-gray-400"
          } ${allowEdit ? "" : "border-none bg-gray-100 text-gray-400"}`}
        >
          <input
            id={inputId}
            className={`${
              type === "radio" ? "w-fit" : "w-full"
            } border-none outline-none bg-transparent h-full ${
              allowEdit ? "cursor-text" : "cursor-default"
            }`}
            placeholder={enableEdit && placeholder}
            type={type}
            disabled={!allowEdit}
            checked={checked}
            value={value}
            {...register(name)}
          />
          {enableEdit && type === "radio" && (
            <label className="" htmlFor={inputId}>
              {label}
            </label>
          )}
        </div>
      ) : (
        <div
          className={`w-full flex-1 px-2 py-1.5 border-gray-400 rounded-md
          `}
        >
          <input
            id={inputId}
            className="w-full border-none outline-none h-full cursor-default"
            readOnly
            value={value}
            type={type}
            placeholder={placeholder}
            {...register(name)}
          />
        </div>
      )}
    </div>
  );
}

export default TextField;
