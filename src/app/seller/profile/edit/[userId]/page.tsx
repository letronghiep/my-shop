"use client";
import Information from "@/components/profiles/Information";
import Shippings from "@/components/profiles/Shippings";
import Tabs, { Tab } from "@/components/Tabs";
import useResponsive from "@/hooks/useResponsive";
import {
  HomeOutlined,
  InfoCircleOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
import { DatePicker } from "antd";
import { useParams } from "next/navigation";
import { useId } from "react";

function EditProfile() {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const params = useParams();
  console.log(params);
  const userId = params.userId;
  const profileId = useId();
  const shippingId = useId();
  return (
    <div className="container mx-auto max-w-[1200px]">
      <Tabs type={isMobile ? "vertical" : "horizontal"}>
        <Tab
          link={`#${profileId}`}
          label="Thông tin cơ bản"
          icon={
            <InfoCircleOutlined
              style={{
                fontSize: "20px",
              }}
            />
          }
        >
          <Information userId={userId.toString()} />
        </Tab>
        <Tab
          link={`#${shippingId}`}
          label="Địa chỉ"
          icon={
            <HomeOutlined
              style={{
                fontSize: "20px",
              }}
            />
          }
        >
          <Shippings />
        </Tab>
      </Tabs>
    </div>
  );
}

export default EditProfile;
