'use client'
import { Col, Statistic } from "antd";
import Link from "next/link";
import React from "react";

type Props = {
  span: number;
  title: string;
  value: number;
  formatter?: any;
  precision?: number;
  redirectLink?: string
};

function TodoItem({ span, title, value, formatter, precision, redirectLink }: Props) {
  return (
    <Col span={span} className="text-blue-500 text-sm">
      <Link href={`/seller/${redirectLink}`}>
        <Statistic
          className="flex flex-col-reverse items-center justify-center"
          title={title}
          value={value}
          precision={precision}
          formatter={formatter}
        />
      </Link>
    </Col>
  );
}

export default TodoItem;
