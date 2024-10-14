"use client";
import TextField from "@/components/TextField";
import WorkFlow, { ClassName, Label, State } from "@/components/WorkFlow";
import useResponsive from "@/hooks/useResponsive";
import { getMe } from "@/services/user";
import useAuthStore from "@/stores/userStore";
import { IUser } from "@/types/global";
import {
  CheckCircleTwoTone,
  CloseOutlined,
  CopyFilled,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";

function Profiles() {
  const [dataUser, setDataUser] = useState<IUser | null>(null);
  const { isMobile, isTablet } = useResponsive();
  const [activeTab, setActiveTab] = useState(0);
  const [tooltipText, setTooltipText] = useState("Copy");
  const [enableEdit, setEnableEdit] = useState(false);
  const [allowEdit, setAllowEdit] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const { user } = useAuthStore();
  useEffect(() => {
    if (user) setDataUser(user);
  }, [user]);

  const accountId = useId();
  const profileId = useId();
  const addressId = useId();
  const setValueOfFormData = useCallback(() => {
    setValue("userId", dataUser?.usr_id ?? "");
    setValue("username", dataUser?.usr_name ?? "");
    setValue("fullName", dataUser?.usr_full_name ?? "");
    setValue("sex", dataUser?.usr_sex ?? "");
  }, [dataUser, setValue]);
  useEffect(() => {
    if (dataUser) setValueOfFormData();
  }, [dataUser, setValueOfFormData]);
  useEffect(() => {
    async function getDataMe() {
      const data = await getMe();
      console.log(data);
    }
    getDataMe();
  }, []);
  const tabItems = [
    {
      title: "Tài khoản đăng nhập",
      link: `#${accountId}`,
      state: "Success",
      icon: (
        <CheckCircleTwoTone style={{ fontSize: 24 }} twoToneColor="#52c41a" />
      ),
    },
    {
      title: "Địa chỉ",
      link: `#${addressId}`,
      icon: !user?.sent_address ? (
        <QuestionCircleOutlined style={{ fontSize: 24, color: "#ccc" }} />
      ) : (
        <CheckCircleTwoTone style={{ fontSize: 24 }} twoToneColor="#52c41a" />
      ),
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setTooltipText("Copied!"); // Hiển thị "Copied" khi sao chép thành công
        setTimeout(() => setTooltipText("Copy"), 2000); // Reset lại tooltip sau 2 giây
      })
      .catch((err) => {
        console.error("Không thể sao chép", err);
      });
  };
  const handleEditClick = () => {
    setEnableEdit(!enableEdit);
  };
  const handleEditAvatar = () => {
    setEditAvatar(!editAvatar);
  };
  return (
    <>
      <h1 className="font-bold text-2xl ">Hồ sơ người bán</h1>
      {dataUser &&
        (!dataUser.received_address || !dataUser.sent_address) &&
        isOpen && (
          <div className="relative my-3 shadow-sm shadow-gray-200 px-4 py-3 bg-yellow-100">
            Vui lòng điền đầy đủ thông tin địa chỉ nhận/giao hàng của bạn để tạo
            đơn hàng.{" "}
            <Link
              className="hover:underline text-blue-500"
              href={`#${addressId}`}
            >
              {" "}
              Cập nhật địa chỉ đơn hàng{" "}
            </Link>{" "}
            để tiếp tục.
            <CloseOutlined
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => {
                setIsOpen(false);
              }}
            />
          </div>
        )}
      <div className="px-5 py-4 bg-white shadow-sm shadow-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <div
            className="relative w-fit h-fit rounded-full overflow-hidden"
            onMouseEnter={handleEditAvatar}
            onMouseLeave={handleEditAvatar}
          >
            {dataUser?.usr_avatar ? (
              <Image
                src={dataUser.usr_avatar}
                alt={dataUser.usr_avatar}
                width={90}
                height={90}
                className="rounded-full"
              />
            ) : (
              <Image
                src="/no-avatar.avif"
                alt="no avatar"
                width={90}
                height={90}
                className="rounded-full "
              />
            )}
            {editAvatar && (
              <div className="absolute bottom-0 right-0  -translate-y-1/2 rounded-b-full text-white w-full bg-edit-bg flex items-center justify-center">
                Edit
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-y-1 md:gap-x-2">
            <h2 className="font-bold text-2xl">
              {dataUser?.usr_full_name || dataUser?.usr_name}
            </h2>
            <div className="flex items-center gap-x-2 order-0 md:order-1">
              <p className="text-xs md:text-base hidden md:block">
                ID người bán:
              </p>
              <p className="text-xs md:text-base">
                {dataUser?.usr_id?.toString()}
              </p>
              <Tooltip title={tooltipText} trigger="hover" placement="top">
                <CopyFilled
                  onClick={() =>
                    copyToClipboard(dataUser?.usr_id?.toString() || "")
                  }
                />
              </Tooltip>
            </div>
            <WorkFlow
              size={isMobile ? "small" : "medium"}
              state={
                dataUser?.usr_status === "active"
                  ? State.Approve
                  : State.Pending
              }
              label={
                dataUser?.usr_status === "active"
                  ? Label.Approve
                  : Label.Pending
              }
              className={
                dataUser?.usr_status === "active"
                  ? ClassName.Approve
                  : ClassName.Pending
              }
            />
          </div>
        </div>
        <button
          onClick={handleEditClick}
          className="px-4 py-1 hover:underline hover:text-blue-500"
        >
          Sửa <EditOutlined />{" "}
        </button>
      </div>

      <div className="flex items-baseline gap-x-3">
        <div className="shadow-sm shadow-neutral-800/70 relative hidden md:block">
          {tabItems.map((tab, index) => (
            <Link
              href={`${tab.link}`}
              className={`py-3 px-4 focus:outline-none transition-transform ease-linear duration-150 cursor-pointer ${
                activeTab === index
                  ? "text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              } cursor-pointer flex items-center gap-x-2`}
              key={tab.link}
              onClick={() => setActiveTab(index)}
              role="tab"
              aria-selected={activeTab === index}
            >
              {tab.icon}
              <h2 className="">{tab.title}</h2>
              <span
                className={`absolute top-0 right-0 w-[2px] bg-blue-500 transition-transform duration-300 rounded-full`}
                style={{
                  transform: `translateY(${activeTab * 100}%)`,
                  height: `${100 / tabItems.length}%`,
                }}
              />
            </Link>
          ))}
        </div>
        <div className="w-full flex-1 flex flex-col gap-y-5 transition-shadow duration-100 ease-linear scroll-smooth">
          <div
            id={accountId}
            className="p-3 shadow-sm shadow-neutral-800/70 w-full flex flex-col gap-y-2"
          >
            <div>
              <h2 className="font-bold text-base">Tài khoản đăng nhập</h2>
              <p className="text-gray-500">Quản lý tài khoản đăng nhập Shop</p>
            </div>
            <TextField
              enableEdit={enableEdit}
              title="Tài khoản"
              register={register}
              name="username"
              placeholder="Le trong hiep"
              allowEdit={false}
            />
            <TextField
              enableEdit={enableEdit}
              title="ID tài khoản"
              register={register}
              name="userId"
              placeholder="453444"
              allowEdit={false}
            />
            <TextField
              enableEdit={enableEdit}
              register={register}
              name="email"
              title="Email"
              value="abc@example.com"
              placeholder="abc@example.com"
              allowEdit={true}
            />
          </div>
          <div
            id={addressId}
            className="p-3 shadow-sm shadow-neutral-800/70 w-full flex flex-col gap-y-2"
          >
            <div>
              <h2 className="font-bold text-base">Thông tin người dùng</h2>
              <p className="text-gray-500">
                Quản lý thông tin cá nhân của Shop
              </p>
            </div>
            <TextField
              enableEdit={enableEdit}
              title="Họ tên"
              register={register}
              placeholder="Nguyen Van A"
              name="fullName"
              allowEdit={false}
            />
            <TextField
              enableEdit={enableEdit}
              title="Số điện thoại"
              name="phone"
              register={register}
              placeholder="09xxxxxx14"
              allowEdit={true}
            />
            {enableEdit ? (
              <div className="flex items-center w-full">
                <h2 className="w-max flex-1">Giới tính</h2>
                <div className="flex gap-x-3 flex-1">
                  <label className="flex items-center gap-x-2">
                    <input
                      type="radio"
                      value="Nam"
                      {...register("sex")}
                      onChange={() => setValue("sex", "Nam")}
                      defaultChecked={dataUser?.usr_sex === "Nam"}
                    />
                    <span>Nam</span>
                  </label>
                  <label className="flex items-center gap-x-2">
                    <input
                      type="radio"
                      value="Nữ"
                      {...register("sex")}
                      onChange={() => setValue("sex", "Nữ")}
                      defaultChecked={dataUser?.usr_sex === "Nữ"}
                    />
                    <span>Nữ</span>
                  </label>
                </div>
              </div>
            ) : (
              <TextField
                enableEdit={enableEdit}
                title="Giới tính"
                name="sex"
                register={register}
                placeholder="Nam"
                allowEdit={true}
              />
            )}
            <TextField
              enableEdit={enableEdit}
              title="Sinh nhật"
              name="dateOfBirth"
              register={register}
              placeholder="MM/dd/yyyy"
              allowEdit={true}
            />
          </div>
          <div
            id={profileId}
            className="p-3 shadow-sm shadow-neutral-800/70 w-full flex flex-col gap-y-2"
          >
            <div>
              <h2 className="font-bold text-base">Địa chỉ kho</h2>
              <p className="text-gray-500">Quản lý địa chỉ giao / nhận hàng</p>
            </div>
            <TextField
              enableEdit={enableEdit}
              title="Địa chỉ nhân"
              register={register}
              placeholder="Phu Dien - Bac Tu Liem - Ha Noi"
              name="received"
              allowEdit={true}
            />
            <TextField
              enableEdit={enableEdit}
              title="Địa chỉ gửi"
              register={register}
              placeholder="Phu Dien - Bac Tu Liem - Ha Noi"
              name="sent"
              allowEdit={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profiles;
