"use client";
import { INotification } from "@/types/global";
import { DownOutlined } from "@ant-design/icons";
import { Empty, Flex, Typography } from "antd";
import Link from "next/link";

function Notifications({ notifications }: INotification) {
  return (
    <>
      <Flex justify="space-between" align="center">
        <Typography.Title level={4} className="text-2xl font-bold">
          Thông báo
        </Typography.Title>
        <Link
          href="/seller/announcement"
          className="flex items-center text-sky-500 hover:text-blue-500 hover:underline gap-x-2"
        >
          <Typography.Text
            style={{
              color: "#0070f3",
            }}
          >
            Xem thêm
          </Typography.Text>
          <DownOutlined />
        </Link>
      </Flex>
      {notifications && notifications.length > 0 ? (
        notifications.map((notification) => (
          <Link key={notification.id} href={`${notification.link}`}>
            <Typography.Text>
              Cơ hội nhận quà cuối tháng Shop ơi!
            </Typography.Text>
          </Link>
        ))
      ) : (
        <Empty
          style={{
            width: "100%",
          }}
          description="Không có thông báo mới"
        />
      )}
    </>
  );
}

export default Notifications;
