"use client";
import useResponsive from "@/hooks/useResponsive";
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
import {
  Avatar,
  Dropdown,
  Flex,
  notification,
  Row,
  Space,
  Typography,
} from "antd";
import { Header } from "antd/es/layout/layout";
import { ItemType } from "antd/es/menu/interface";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const profileMenu: ItemType[] = [
    {
      key: "1",
      label: (
        <Flex
          gap="middle"
          vertical
          align="center"
          flex="center"
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            src={`${
              user.usr_avatar
                ? user.usr_avatar
                : user.usr_name?.split("")[0].toUpperCase()
            }`}
            alt="avatar"
            size={isMobile ? 0 : 60}
          />
          <Typography className="hidden md:block">
            {user.usr_full_name || user.usr_name}
          </Typography>
        </Flex>
      ),
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Typography>Hồ Sơ Shop</Typography>,
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: <Typography>Thiết Lập Shop</Typography>,
      onClick: () => router.push(`/seller/profile/edit/${user._id}`),
    },
    {
      key: "4",
      icon: <GlobalOutlined />,
      label: <Typography>Tiếng Việt (Vietnamese)</Typography>,
    },
    {
      type: "divider",
    },
    {
      key: "5",
      icon: <LogoutOutlined />,
      label: <Typography>Đăng xuất</Typography>,
      danger: true,
      onClick: logoutUser,
    },
  ];
  return (
    <>
      <Header
        style={{
          backgroundColor: bgColor,
          padding: "10px 20px",
        }}
      >
        <Flex
          align="center"
          justify="space-between"
          style={{
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          <Link href="/seller" className="flex items-center gap-x-2">
            <Image alt="Logo" src="/logo.svg" width={120} height={80} />
            <Typography.Title
              style={{
                color: "#0070f3",
                marginBottom: "4px",
              }}
              level={4}
            >
              Kênh người bán
            </Typography.Title>
          </Link>
          <Flex align="center" justify="center" gap="middle">
            <Dropdown menu={{ items }} trigger={["hover"]}>
              <BellOutlined
                style={{
                  fontSize: "20px",
                  padding: "10px",
                }}
              />
            </Dropdown>
            <Dropdown
              menu={{ items: profileMenu }}
              placement="bottomLeft"
              trigger={[`${isMobile ? "click" : "hover"}`]}
              overlayStyle={{ width: "240px" }}
            >
              <Flex>
                {isMobile ? (
                  <Avatar
                    src={`${
                      user.usr_avatar
                        ? user.usr_avatar
                        : user.usr_name?.split("")[0].toUpperCase()
                    }`}
                    alt="avatar"
                  />
                ) : (
                  <Space align="center">
                    <Avatar
                      src={`${
                        user.usr_avatar
                          ? user.usr_avatar
                          : user.usr_name?.split("")[0].toUpperCase()
                      }`}
                      alt="avatar"
                    />
                    <Typography.Title
                      style={{
                        margin: 0,
                      }}
                      level={5}
                      className="hidden md:inline-block"
                    >
                      {user.usr_full_name || user.usr_name}
                    </Typography.Title>
                    <DownOutlined />
                  </Space>
                )}
              </Flex>
            </Dropdown>
          </Flex>
        </Flex>
      </Header>
    </>
  );
}

export default ShopHeader;
