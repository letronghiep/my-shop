"use client";
import {
  EyeOutlined,
  HourglassOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CheckOutlined,
  StopOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import React from "react";
export enum State {
  Draft = "Draft",
  Pending = "Pending",
  Approve = "Approve",
  Reject = "Reject",
  Completed = "Completed",
  Expired = "Expired",
  Canceled = "Canceled",
  // Add more states
}
export enum Label {
  Draft = "Ẩn",
  Pending = "Đang chờ duyệt",
  Approve = "Đã duyệt",
  Reject = "Từ chối",
  Completed = "Hoàn thành",
  Canceled = "Hủy",
  Expired = "Hết hạn",
}
export enum ColorIcon {
  Draft = "#f94e2f",
  Pending = "#ccc",
  Approve = "#52c41a",
  Reject = "#ff5252",
  Completed = "#52c41a",
  Canceled = "#ccc",
  Expired = "#ccc",
}
export enum ClassName {
  Draft = "text-red-500",
  Pending = "text-gray-400",
  Approve = "text-green-500",
  Reject = "text-red-600",
  Completed = "text-green-500",
  Canceled = "text-gray-400",
  Expired = "text-gray-600",
}
type WorkFlowType = {
  state: State;
  className?: ClassName;
  label: Label;
  size: "small" | "medium" | "large";
};

function WorkFlow({ state, className, label, size }: WorkFlowType) {
  const iconMap = {
    [State.Draft]: (
      <EyeOutlined
        style={{
          color: ColorIcon.Draft,
        }}
      />
    ),
    [State.Pending]: (
      <HourglassOutlined
        style={{
          color: ColorIcon.Pending,
        }}
      />
    ),
    [State.Approve]: (
      <CheckCircleOutlined
        style={{
          color: ColorIcon.Approve,
        }}
      />
    ),
    [State.Reject]: (
      <CloseCircleOutlined
        style={{
          color: ColorIcon.Reject,
        }}
      />
    ),
    [State.Completed]: (
      <CheckOutlined
        style={{
          color: ColorIcon.Completed,
        }}
      />
    ),
    [State.Canceled]: (
      <StopOutlined
        style={{
          color: ColorIcon.Canceled,
        }}
      />
    ),
    [State.Expired]: (
      <HistoryOutlined
        style={{
          color: ColorIcon.Expired,
        }}
      />
    ),
  };
  const sizeClasses = {
    small: "px-2 py-0.5 text-xs space-x-1 gap-x-1",
    medium: "px-3 py-1 text-md space-x-1 gap-x-1",
    large: "px-5 py-1.5 text-base space-x-2 gap-x-1.5",
  };
  const baseClasses = "flex items-center justify-center border rounded-full";
  return (
    <div
      className={`${baseClasses} ${sizeClasses[size]}`}
      style={{
        borderColor: ColorIcon[state],
        color: ColorIcon[state],
      }}
    >
      {iconMap[state]}
      <p className={`${className}`}>{label}</p>
    </div>
  );
}

export default WorkFlow;
