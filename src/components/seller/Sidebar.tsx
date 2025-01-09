"use client";
import useResponsive from "@/hooks/useResponsive";
import {
  CloseOutlined,
  ContainerOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Col, Drawer, Menu, MenuProps, Space, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: <Link href="/seller">Trang chủ</Link>,
  },
  {
    key: "2",
    icon: <ContainerOutlined />,
    label: `Quản lý đơn hàng`,
    children: [
      {
        key: "3",
        label: <Link href="/seller/orders/list">Danh sách đơn hàng</Link>,
        title: "/seller/orders/list",
      },
      {
        key: "4",
        label: <Link href="/seller/bulk_delivery">Giao hàng loạt</Link>,
        title: "/seller/bulk_delivery",
      },
      {
        key: "5",
        label: "Đơn hủy",
      },
      {
        key: "6",
        label: "Trả hàng/Hoàn tiền",
      },
    ],
  },
];
const Sidebar = () => {
  const { isMobile } = useResponsive();
  const [selectedKey, setSelectedKey] = useState<string>("1");
  const windowPathname = usePathname();

  const {
    token: { colorBgContainer, colorText },
  } = theme.useToken();
  const [open, setOpen] = useState(false);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    // setSelectedKey(e.key);
  };
  useEffect(() => {
    const allData = items.flatMap((item) => {
      if (item && "children" in item && Array.isArray(item.children)) {
        return [item, ...item.children];
      }
      return [item];
    });
    const index = allData.findIndex((item) => {
      if (item && "title" in item && item.title) {
        return windowPathname.includes(item.title);
      }
      return false;
    });
    if (index > -1 && allData[index]) {
      setSelectedKey(allData[index].key as string);
    }
  }, [windowPathname]);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  if (isMobile) {
    return (
      <>
        <Col
          onClick={showDrawer}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            backgroundColor: colorBgContainer,
            zIndex: 100,
            padding: "4px",
          }}
          className="block md:hidden fixed bottom-0 z-50 left-0 translate-x-7 -translate-y-7 py-2 px-2 shadow-sm shadow-blue-500"
        >
          <MenuOutlined style={{ fontSize: 20, color: "blue" }} />
        </Col>
        <Drawer
          title="Sidebar"
          placement="left"
          closable={false}
          onClose={onClose}
          open={open}
          width={280}
        >
          <Space
            onClick={onClose}
            className="absolute top-0 right-0 -translate-x-5 translate-y-4"
          >
            <CloseOutlined style={{ fontSize: 20 }} />
          </Space>
          <Menu
            onClick={onClick}
            selectedKeys={[selectedKey]}
            mode="inline"
            items={items}
          />
        </Drawer>
      </>
    );
  }

  return (
    <Sider
      style={{ background: colorBgContainer, color: colorText }}
      className="site-layout-background"
      width={240}
    >
      <Menu
        onClick={onClick}
        selectedKeys={[selectedKey]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
