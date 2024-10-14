'use client'
import { INotification } from "@/types/global";
import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { Fragment } from "react";

function Notification({ notifications, className }: INotification) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Thông báo</h2>
        <Link
          href="/seller/announcement"
          className="flex items-center text-sky-500 hover:text-blue-500 hover:underline gap-x-2"
        >
          <p>Xem thêm</p>
          <DownOutlined />
        </Link>
      </div>
      {notifications?.map((notification) => (
        <Link key={notification.id} href={`${notification.link}`}>
            <p>Cơ hội nhận quà cuối tháng Shop ơi!</p>
        </Link>
      ))}
    </div>
  );
}

export default Notification;
