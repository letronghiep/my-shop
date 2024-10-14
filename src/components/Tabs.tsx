"use client";
import useResponsive from "@/hooks/useResponsive";
import { CheckCircleTwoTone, QuestionCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Children, FC, isValidElement, ReactNode, useState } from "react";

type TabProps = {
  label: string;
  children: ReactNode;
  state?: "In Progress" | "Success";
  link?: string;
  icon?: boolean;
  id?: string;
};

export const Tab: FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

interface TabsProps {
  children: ReactNode;
  type: string;
}

function Tabs({ children, type }: TabsProps) {
  const baseStyles = "flex";
  const horizontalStyles = "flex-row gap-x-3 border-b border-gray-300";
  const verticalStyles = "flex-col gap-y-3 border-r border-gray-300";
  const [activeTab, setActiveTab] = useState(0);
  const { isMobile } = useResponsive();
  return (
    <div
      className={`${
        type === "vertical"
          ? "flex gap-x-3"
          : "flex flex-col gap-y-3 items-center"
      }`}
    >
      <div
        className={`${baseStyles} ${
          type === "vertical" ? verticalStyles : horizontalStyles
        } relative ${type === "vertical" ? "w-fit" : ""}`}
      >
        {Children.map(children, (child, index) => {
          if (isValidElement(child)) {
            return (
              <div
                key={index}
                className={` py-2 px-4 focus:outline-none flex-1 text-center transition-transform ease-linear duration-150 cursor-pointer ${
                  type === "vertical" ? "w-full" : ""
                }`}
                onClick={() => setActiveTab(index)}
              >
                <Link
                  href={`${child.props.link}`}
                  className={`flex items-center gap-x-2`}
                >
                  {child.props.icon && child.props.state === "In Progress" ? (
                    <QuestionCircleOutlined
                      style={{ fontSize: 24, color: "#ccc" }}
                    />
                  ) : (
                    <CheckCircleTwoTone
                      style={{ fontSize: 24 }}
                      twoToneColor="#52c41a"
                    />
                  )}
                  <p
                    className={`${
                      activeTab === index
                        ? "text-blue-500 "
                        : "text-gray-500 hover:text-blue-500"
                    } w-max`}
                  >
                    {child.props.label}
                  </p>
                </Link>
                <span
                  className={`absolute ${
                    type === "vertical"
                      ? "right-0 top-0 w-1"
                      : "bottom-0 left-0 h-1"
                  } bg-blue-500 transition-all duration-300 rounded-full`}
                  style={{
                    height:
                      type === "vertical"
                        ? `${100 / Children.count(children)}%`
                        : "2px",
                    transform:
                      type === "vertical"
                        ? `translateY(${activeTab * 100}%)`
                        : `translateX(${activeTab * 100}%)`,
                    width:
                      type === "vertical"
                        ? "2px"
                        : `${100 / Children.count(children)}%`,
                  }}
                />
              </div>
            );
          }
        })}
      </div>
      <div className={`${type === "vertical" ? "ml-3 w-full" : "my-3"}`}>
        {Children.map(children, (child, index) => {
          if (index === activeTab && isValidElement(child)) {
            return <div id={child.props.id}>{child}</div>;
          }
        })}
      </div>
    </div>
  );
}

export default Tabs;
