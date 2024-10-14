'use client'
import { Row, Col, Statistic, StatisticProps } from "antd";
import React from "react";
import CountUp from "react-countup";
import TodoItem from "./TodoItem";
type Props = {
  className?: string;
};
const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} separator="," />
);
function TodoList({ className }: Props) {
  // const

  return (
    <Row gutter={16} className={className}>
     <TodoItem span={6} title="Chờ xác nhận" value={0} formatter={formatter} precision={3} />
     <TodoItem span={6} title="Chờ lấy hàng" value={0} formatter={formatter} precision={3} />
     <TodoItem span={6} title="Đã xử lý" value={0} formatter={formatter} precision={3} />
     <TodoItem span={6} title="Đơn hủy" value={0} formatter={formatter} precision={3} />
    </Row>
  );
}

export default TodoList;
