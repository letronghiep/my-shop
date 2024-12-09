"use client";
import useResponsive from "@/hooks/useResponsive";
import { handleLogout } from "@/services/auth/logout";
import { getMe } from "@/services/user";
import useAuthStore from "@/stores/userStore";
import { IUser } from "@/types/global";
import {
  BellOutlined,
  DownOutlined,
  GlobalOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Menu, notification, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
type Props = {
  bgColor?: string;
  user: IUser;
};
const items: MenuProps["items"] = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

function ShopHeader({ bgColor = "#FFFFFF", user }: Props) {
  const logout = useAuthStore((state) => state.logout);
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const router = useRouter();
  const logoutUser = async () => {
    try {
      await logout();
    } catch (error) {
      notification.error({
        message: error as string,
        showProgress: true,
        placement: "top",
      });
    }
  };
  const profileMenu = (
    <>
      <Menu className="w-[300px]">
        <Menu.Item>
          <div className="flex items-center justify-center flex-col gap-2">
            <Avatar size={isMobile ? 0 : 80}>
              {user.usr_avatar
                ? user.usr_avatar
                : user.usr_name?.split("")[0].toUpperCase()}
            </Avatar>
            <p className="hidden md:block">
              {user.usr_name || user.usr_full_name}
            </p>
          </div>
        </Menu.Item>
        <Menu.Item key="1" icon={<UserOutlined />}>
          Hồ Sơ Shop
        </Menu.Item>
        <Menu.Item key="2" icon={<SettingOutlined />}>
          Thiết Lập Shop
        </Menu.Item>
        <Menu.Item key="3" icon={<GlobalOutlined />}>
          Tiếng Việt (Vietnamese)
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          onClick={logoutUser}
          key="4"
          icon={<LogoutOutlined />}
          danger
        >
          Đăng xuất
        </Menu.Item>
      </Menu>
    </>
  );
  return (
    <>
      <Header
        style={{
          backgroundColor: bgColor,
          padding: "10px 20px",
        }}
      >
        <div className="container max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Image alt="Logo" src="/logo.svg" width={120} height={80} />
            <h5 className="text-lg hidden lg:block">Kênh người bán</h5>
          </div>
          <div>
            <Dropdown menu={{ items }} trigger={["hover"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <BellOutlined
                    style={{
                      fontSize: "20px",
                      padding: "10px",
                    }}
                    className="hover:bg-gray-150 cursor-pointer hover:rounded-full"
                  />
                </Space>
              </a>
            </Dropdown>

            <Dropdown
              overlay={profileMenu}
              trigger={["hover"]}
              placement="bottomRight"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar
                    src="/logo.svg"
                    style={{
                      fontSize: "20px",
                      padding: "10px",
                    }}
                    className="hover:bg-gray-150 cursor-pointer hover:rounded-full"
                  />
                  <h3 className="hidden md:inline-block">
                    {user.usr_name || user.usr_full_name}
                  </h3>
                  {isMobile ? (
                    <Avatar>
                      {user.usr_avatar
                        ? user.usr_avatar
                        : user.usr_name?.split("")[0].toUpperCase()}
                    </Avatar>
                  ) : (
                    <DownOutlined style={{}} />
                  )}
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  );
}

export default ShopHeader;
