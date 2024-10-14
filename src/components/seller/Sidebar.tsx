"use client";
import useResponsive from "@/hooks/useResponsive";
import {
  CloseOutlined,
  ContainerOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Drawer, DrawerProps, Menu, MenuProps, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
type MenuItem = Required<MenuProps>["items"][number];
const menuSidebar: MenuItem[] = [
  {
    key: `order`,
    icon: <ContainerOutlined />,
    label: `Quản lý đơn hàng`,
    children: [
      {
        key: "1",
        label: "Tất cả",
      },
      {
        key: "2",
        label: <Link href="/seller/bulk_delivery">Giao hàng loạt</Link>,
      },
      {
        key: "3",
        label: "Đơn hủy",
      },
      {
        key: "4",
        label: "Trả hàng/Hoàn tiền",
      },
    ],
  },
];

function Sidebar() {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const {
    token: { colorBgContainer, borderRadiusLG, colorText },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  if (isMobile) {
    return (
      <>
        <div
          onClick={showDrawer}
          className="block md:hidden fixed bottom-0 z-50 left-0 translate-x-7 -translate-y-7 py-2 px-2  shadow-sm shadow-blue-500"
        >
          <MenuOutlined
            style={{
              fontSize: 20,
              color: "blue",
            }}
          />
        </div>
        <Drawer
          title="Basic Drawer"
          placement="left"
          closable={false}
          onClose={onClose}
          open={open}
          width={280}
        >
          <div
            onClick={onClose}
            className="absolute top-0 right-0 -translate-x-5 translate-y-4"
          >
            <CloseOutlined
              style={{
                fontSize: 20,
              }}
            />
          </div>
          <Menu defaultSelectedKeys={["1"]} mode="inline" items={menuSidebar} />
        </Drawer>
      </>
    );
  }
  return (
    <Sider
      style={{ background: colorBgContainer, color: colorText }}
      className="site-layout-background"
      width={200}
    >
      <Menu defaultSelectedKeys={["1"]} mode="inline" items={menuSidebar} />
    </Sider>
  );
}

export default Sidebar;
