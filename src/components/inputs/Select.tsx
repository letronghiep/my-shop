"use client";
import { FormFieldProps } from "@/types/global";
import { Select } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

interface SelectProps<R extends Record<string, string | number>>
  extends FormFieldProps {
  data: R[];
  keyField: Extract<keyof R, string>;
  valueField: Extract<keyof R, string>;
  onChange?: (value: string) => void;
}

function SelectCustom<R extends Record<string, string | number>>({
  control,
  data,
  keyField,
  valueField,
  name,
  placeholder,
  onChange,
}: SelectProps<R>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Select
            {...field}
            onChange={(e) => {
              field.onChange(e);
              onChange?.(e);
            }}
            placeholder={placeholder}
            style={{ width: "100%" }}
          >
            {data.map((item) => (
              <Select.Option value={item[keyField]} key={item[keyField]}>
                {item[valueField]}
              </Select.Option>
            ))}
          </Select>
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </>
      )}
    />
  );
}

export default SelectCustom;
