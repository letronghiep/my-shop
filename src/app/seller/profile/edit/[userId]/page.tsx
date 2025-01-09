"use client";
import Information from "@/components/seller/profiles/Information";
import Shippings from "@/components/seller/profiles/Shippings";
import useFetch from "@/hooks/useFetch";
import useResponsive from "@/hooks/useResponsive";
import { IDataMessage } from "@/types/global";
import { HomeOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Flex, Space, Tabs } from "antd";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useId } from "react";

function EditProfile() {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const params = useParams();
  const userId = params.userId;
  const profileId = useId();
  const shippingId = useId();
  const { data, loading, error } = useFetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/shipping`
  );
  const tabs = [
    {
      label: "Thông tin cơ bản",
      key: "1",
      children: <Information userId={userId.toString()} />,
    },
    {
      label: "Địa chỉ",
      key: "2",
      children: (
        <Shippings
          shippingData={data as IDataMessage}
          loadingShipping={loading}
          error={error as AxiosError}
        />
      ),
    },
  ];
  return (
    <Flex
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "auto",
        background: "#fff",
      }}
    >
      <Tabs
        defaultActiveKey="1"
        items={tabs}
        style={{
          width: "100%",
          padding: `${isMobile ? "0 10px" : "0px 20px"}`,
        }}
      />
    </Flex>
  );
}

export default EditProfile;
