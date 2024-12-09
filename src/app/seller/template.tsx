"use client";
import SpinLoading from "@/components/loading/SpinLoading";
import Sidebar from "@/components/seller/Sidebar";
import useResponsive from "@/hooks/useResponsive";
import { getMe } from "@/services/user";
import useAuthStore from "@/stores/userStore";
import { IUser } from "@/types/global";
import {
  BarChartOutlined,
  MailOutlined,
  ProfileOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, notification, theme } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const ShopHeader = dynamic(() => import("@/components/header/ShopHeader"), {
  ssr: false,
  loading: SpinLoading,
});
const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  ProfileOutlined,
  ShoppingOutlined,
  MailOutlined,
  BarChartOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

// type
type Props = {
  children: React.ReactNode;
};

function ShopLayout({ children }: Props) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { isMobile } = useResponsive();
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const authStore = useAuthStore();
  const userId = useAuthStore((state) => state.user)._id;
  const user = useAuthStore((state) => state.user);
  const phoneNumber = useAuthStore((state) => state.user.usr_phone);
  useEffect(() => {
    async function checkUser() {
      if (!userId && token) {
        const data = await getMe();
        if (data.status === 200) {
          authStore.user = data.metadata.user;
          authStore.isAuthenticated = true;
          authStore.loading = false;
          const dataToken = {
            accessToken: data.metadata.tokens,
            client_id: data.metadata.user._id,
          };
          localStorage.setItem("token", JSON.stringify(dataToken));
        }
        router.refresh();
      }
    }
    checkUser();
  }, [userId, token, authStore, router]);
  useEffect(() => {
    const data = localStorage.getItem("token");
    if (data) {
      const dataToken = JSON.parse(data);
      if (dataToken) {
        setToken(dataToken.accessToken);
      }
    }
  }, [token]);

  useEffect(() => {
    const path = window.location;
    const { origin, pathname, search } = path;
    const nextUrl = `${origin}${pathname}${search}`;
    if (userId && !phoneNumber && !pathname.includes("/seller/profile")) {
      notification.open({
        message: "Vui lòng cập nhật thông tin",
        type: "info",
        showProgress: true,
        onClose: () => {
          router.push(
            `/seller/profile/edit/${userId}?next=${encodeURIComponent(nextUrl)}`
          );
        },
      });
      // router.push(`/seller/profile?next=${encodeURIComponent(nextUrl)}`);
    }
  }, [userId, phoneNumber, router]);
  if (!user) return <SpinLoading />;
  return (
    <Layout>
      <ShopHeader user={user} />
      <Content
        style={{
          maxWidth: "1200px",
          margin: "10px auto",
          width: "100%",
        }}
      >
        <Breadcrumb style={{ margin: "8px 0" }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            // padding: "24px 0",
            margin: "20px 0",
            // background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sidebar />
          <Content
            className="site-layout-background"
            style={{
              padding: isMobile ? "" : "0 24px",
              minHeight: 280,
              margin: "0 auto",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  );
}
export default ShopLayout;
