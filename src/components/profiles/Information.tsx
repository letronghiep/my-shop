"use client";

import { UserSchema } from "@/schemas/UserSchema";
import useAuthStore from "@/stores/userStore";
import { IUser } from "@/types/global";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import Input from "../inputs/Input";
import Avatar from "../Avatar";
import DateSelect from "../inputs/DateSelect";
import { checkMaxSizeFile } from "@/helpers";
import { notification } from "antd";
import { updateUserInfo } from "@/services/user";
import { useRouter } from "next/navigation";

type Props = { userId: string };

export default function Information({ userId }: Props) {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    watch,
  } = useForm<UserSchema>({
    criteriaMode: "all",
  });
  const { user } = useAuthStore();
  const [dataUser, setDataUser] = React.useState<IUser | null>(null);
  const [tmpAvatar, setTmpAvatar] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    if (user) setDataUser(user);
  }, [user]);
  const [isFocused, setIsFocused] = useState(false);
  const setValueOfFormData = useCallback(() => {
    setValue("userId", dataUser?.usr_id ?? 0);
    setValue("username", dataUser?.usr_name ?? "");
    setValue("userFullName", dataUser?.usr_full_name ?? "");
    setValue("userSex", dataUser?.usr_sex ?? "");
    setValue("userPhone", dataUser?.usr_phone ?? "");
    setValue("userDateOfBirth", dataUser?.usr_date_of_birth ?? "");
    setValue("userAvatar", dataUser?.usr_avatar ?? tmpAvatar);
    // setValue("userEmail", dataUser?.usr_email ?? "");
    // setValue("dateOfBirth", dataUser?.usr_date_of_birth ?? "");
    // setValue("userSalt", dataUser?.usr_salt ?? "");
    // setValue("userPassword", "");
  }, [dataUser, setValue, tmpAvatar]);
  useEffect(() => {
    if (dataUser) setValueOfFormData();
  }, [dataUser, setValueOfFormData]);
  const handleDateChange = (newDate: {
    day: string;
    month: string;
    year: string;
  }) => {
    setValue(
      "userDateOfBirth",
      `${newDate.day}/${newDate.month}/${newDate.year}`
    );
  };
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      // Upload image to server
      const checkSize = checkMaxSizeFile(file);
      if (checkSize) {
        const url = URL.createObjectURL(file);
        setTmpAvatar(url);
      } else {
        notification.warning({
          message: "Kích thước ảnh phải nhỏ hơn hoặc bằng 1MB",
          type: "warning",
        });
      }
    }
  };
  const handleSubmitInfo = async (data: UserSchema) => {
    const dataUpdateUser: IUser = {
      usr_id: data.userId,
      usr_name: data.username,
      usr_full_name: data.userFullName,
      usr_sex: data.userSex,
      usr_phone: data.userPhone,
      usr_date_of_birth: data.userDateOfBirth,
      usr_avatar: data.userAvatar,
      // usr_email: data.userEmail,
      // usr_salt: data.userSalt,
      // usr_password: data.userPassword,
    };
   const res = await updateUserInfo(userId, dataUpdateUser);
    // console.log(res);
    // notification.success({
    //   message: "Cập nhật thông tin thành công",
    //   type: "success",
    //   showProgress: true,
    //   onClose: () => {
    //     router.refresh();
    //   },
    // });
  };

  return (
    <div className="bg-white container">
      <div className="grid grid-cols-12 gap-x-4 bg-white p-6">
        <div className="col-span-12 lg:col-span-8 order-2 lg:order-1">
          <h2 className="text-xl font-bold ">Thông tin cơ bản</h2>
          <div className="flex flex-col gap-y-5 mt-6">
            <Input
              type="text"
              label="Mã người dùng"
              name="userId"
              register={register}
              error={errors.userId}
              options={{
                disabled: true,
                style: {
                  cursor: "not-allowed",
                },
                translate: watch("userId") || isFocused,
                onfocus: () => {
                  setIsFocused(true);
                },
                onblur: () => {
                  setIsFocused(false);
                },
              }}
              size="md"
              variant={`${errors.userId ? "danger" : "default"}`}
            />
            <Input
              type="text"
              label="Tên đăng nhập"
              name="username"
              register={register}
              error={errors.username}
              options={{
                translate: !!watch("username") || isFocused,
                onfocus: () => {
                  setIsFocused(true);
                },
                onblur: () => {
                  setIsFocused(false);
                },
                defaultValue: watch("username"),
              }}
              size="md"
              variant={`${errors.username ? "danger" : "default"}`}
            />
            <Input
              type="text"
              label="Họ và tên"
              name="userFullName"
              register={register}
              error={errors.userFullName}
              size="md"
              options={{
                translate: watch("userFullName") || isFocused,
                onfocus: () => {
                  setIsFocused(true);
                },
                onblur: () => {
                  setIsFocused(false);
                },
              }}
              variant={`${errors.userFullName ? "danger" : "default"}`}
            />
            <Input
              type="email"
              label="Email"
              name="userEmail"
              register={register}
              error={errors.userEmail}
              size="md"
              options={{
                translate: watch("userEmail") || isFocused,
                onfocus: () => {
                  setIsFocused(true);
                },
                onblur: () => {
                  setIsFocused(false);
                },
              }}
              variant={`${errors.userEmail ? "danger" : "default"}`}
            />
            <Input
              type="text"
              label="Số điện thoại"
              name="userPhone"
              register={register}
              error={errors.userPhone}
              size="md"
              options={{
                translate: watch("userPhone") || isFocused,
                onfocus: () => {
                  setIsFocused(true);
                },
                onblur: () => {
                  setIsFocused(false);
                },
              }}
              variant={`${errors.userPhone ? "danger" : "default"}`}
            />

            <DateSelect
              onApply={handleDateChange}
              dataDate={dataUser?.usr_date_of_birth}
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 order-1 lg:order-2 flex items-center justify-center flex-col gap-y-3">
          <Avatar
            src={dataUser?.usr_avatar || tmpAvatar}
            alt="avatar"
            handleChangeImage={handleChangeImage}
            register={register}
            name="userAvatar"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-white border ml-6 mb-6 border-blue-500 hover:border-none hover:bg-blue-500 text-black hover:text-white hover:highlight-white  py-2 px-4 rounded cursor-pointer"
        onClick={handleSubmit(handleSubmitInfo)}
      >
        Cập nhật
      </button>
    </div>
  );
}
