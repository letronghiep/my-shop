import { FormFieldProps } from "@/types/global";
import Image from "next/image";
import React from "react";

interface Props extends FormFieldProps {
  src?: string;
  alt: string;
  handleChangeImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Avatar({ src, alt, register, name, handleChangeImage }: Props) {
  return (
    <>
      {" "}
      <div className="relative w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] rounded-full overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill={true}
            sizes="100%"
            className="rounded-full object-cover"
          />
        ) : (
          <Image
            src="/no-avatar.webp"
            alt="no avatar"
            fill={true}
            sizes="100%"
            className="object-cover"
          />
        )}
      </div>
      <label
        htmlFor="avatar"
        className="border-2 border-blue-400 text-blue-400 font-semibold text-sm  w-[80px]  lg:w-[120px] px-4 py-1 text-center rounded-full border-separate cursor-pointer hover:text-white hover:bg-blue-400 hover:border-none transition-colors duration-300 ease-linear focus:outline-none"
      >
        <input
          id="avatar"
          className="hidden"
          type="file"
          {...register(name)}
          onChange={handleChangeImage}
        />
        Chọn ảnh
      </label>
      <p className="text-gray-400 text-sm italic">
        Dụng lượng file tối đa 1 MB
      </p>
    </>
  );
}

export default Avatar;
