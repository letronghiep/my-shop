"use client";
import { Layout, theme } from "antd";
import { Content } from "next/font/google";
import React from "react";
import { ShopHeader } from "./header";
import Sidebar from "./seller/Sidebar";
import { IUser } from "@/types/global";
// import { Layout, notification, theme } from "antd";
type Props = {
  user: IUser;
  children: React.ReactNode;
};

function ShopLayout({ user, children }: Props) {
  const { Content } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
        <Layout
          style={{
            margin: "20px 0",
            borderRadius: borderRadiusLG,
            display: "flex",
            columnGap: "20px",
          }}
        >
          <Sidebar />
          <Content
            className="site-layout-background"
            style={{
              minHeight: 280,
              margin: "0 auto",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default ShopLayout;
