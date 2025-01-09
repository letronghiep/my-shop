"use client";
import { FormFieldProps } from "@/types/global";
import { Radio } from "antd";
import { Controller } from "react-hook-form";

interface IRadio extends FormFieldProps {
  className?: string;
  data: string[];
}

function RadioCustom({ name, control, label, data }: IRadio) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          <Radio.Group {...field} name={name}>
            {data.map((item) => (
              <Radio key={item} value={item}>
                {item}
              </Radio>
            ))}
          </Radio.Group>
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

export default RadioCustom;
