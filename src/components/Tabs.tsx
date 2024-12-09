"use client";
import useResponsive from "@/hooks/useResponsive";
import { CheckCircleTwoTone, QuestionCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import {
  Children,
  FC,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type TabProps = {
  label: string;
  children: ReactNode;
  state?: "In Progress" | "Success";
  link?: string;
  icon?: ReactNode;
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
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const { isMobile } = useResponsive();
  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const activeTabElement = tabRefs.current[activeTab];
      if (type === "vertical") {
        setIndicatorStyle({
          height: `${activeTabElement.offsetHeight}px`,
          transform: `translateY(${activeTabElement.offsetTop}px)`,
          width: "2px",
        });
      } else {
        setIndicatorStyle({
          width: `${activeTabElement.offsetWidth}px`,
          transform: `translateX(${activeTabElement.offsetLeft}px)`,
          height: "2px",
        });
      }
    }
  }, [activeTab, children, type]);
  return (
    <div
      className={`${
        type === "vertical" ? "flex gap-x-3" : "flex flex-col gap-y-3"
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
                className={`py-2 px-4 focus:outline-none text-center transition-transform ease-linear duration-150 cursor-pointer ${
                  type === "vertical" ? "w-fit" : "w-fit"
                }`}
                onClick={() => setActiveTab(index)}
              >
                <Link
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  href={`${child.props.link}`}
                  className={`flex items-center justify-center gap-x-2 w-full`}
                >
                  {child.props.icon && child.props.icon}
                  <p
                    className={`${
                      activeTab === index
                        ? "text-blue-500 "
                        : "text-gray-500 hover:text-blue-500"
                    } w-fit ${isMobile ? "hidden" : ""}`}
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
                    ...indicatorStyle,
                    [type === "vertical" ? "right" : "bottom"]: 0,
                    [type === "vertical" ? "width" : "height"]: "2px",
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
