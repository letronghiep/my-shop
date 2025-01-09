"use client";
import { getDistrict, getProvince, getWard } from "@/services/location";
import { ILocation } from "@/types/global";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { IPosition } from "../Map";
import SelectCustom from "./Select";

export interface IDataLocation {
  ward?: string;
  district?: string;
  province?: string;
}

type Props = {
  dataLocation?: IDataLocation;
  onApply: (dataLocation: IDataLocation) => void;
  position: IPosition;
  setPosition: (position: IPosition) => void;
};

function LocationSelect({
  dataLocation,
  position,
  setPosition,
  onApply,
}: Props) {
  const { control, watch, setValue } = useForm<IDataLocation>({
    defaultValues: {
      ward: "",
      district: "",
      province: "",
    },
    criteriaMode: "all",
  });

  const [provinces, setProvinces] = React.useState<ILocation[]>([]);
  const [districts, setDistricts] = React.useState<ILocation[]>([]);
  const [wards, setWards] = React.useState<ILocation[]>([]);
  const [provinceId, setProvinceId] = React.useState<string>();
  const [districtId, setDistrictId] = React.useState<string>();
  const [wardId, setWardId] = React.useState<string>();
  // Fetch provinces on mount
  useEffect(() => {
    async function fetchProvinces() {
      try {
        const response = await getProvince();
        setProvinces(response?.data || []);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    }
    fetchProvinces();
  }, []);

  // Fetch districts when province changes
  useEffect(() => {
    async function fetchDistricts() {
      if (!provinceId) return;

      try {
        const response = await getDistrict(provinceId);
        setDistricts(response?.data || []);
        // Reset district and ward when province changes
        // setValue("districtId", "");
        // setValue("wardId", "");
        // setValue("district", "");
        // setValue("ward", "");
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    }
    fetchDistricts();
  }, [provinceId, setValue]);

  // Fetch wards when district changes
  useEffect(() => {
    async function fetchWards() {
      if (!districtId) return;

      try {
        const response = await getWard(districtId);
        setWards(response?.data || []);
        // Reset ward when district changes
        // setValue("wardId", "");
        // setValue("ward", "");
      } catch (error) {
        console.error("Error fetching wards:", error);
      }
    }
    fetchWards();
  }, [districtId, setValue]);

  // Update position when district changes
  useEffect(() => {
    const district = districts.find((d) => d.id === districtId);
    if (district) {
      setPosition({ lat: district.latitude, lng: district.longitude });
    }
  }, [districtId, districts, setPosition]);

  // Apply changes when form values change
  useEffect(() => {
    const subscription = watch((values) => {
      console.log(values);
      onApply(values);
    });
    return () => subscription.unsubscribe();
  }, [watch, onApply]);

  // Initialize form values from `dataLocation`

  const provincesData = useMemo(
    () =>
      provinces.map((province) => ({ id: province.id, label: province.name })),
    [provinces]
  );
  const districtsData = useMemo(
    () =>
      districts.map((district) => ({ id: district.id, label: district.name })),
    [districts]
  );
  const wardsData = useMemo(
    () => wards.map((ward) => ({ id: ward.id, label: ward.name })),
    [wards]
  );
  const handleSelectProvince = (provinceId: string) => {
    setProvinceId(provinceId);
    const provinceSelect = provinces.find((p) => p.id === provinceId);
    setValue("province", provinceSelect ? provinceSelect.name : "");
  };
  const handleSelectDistrict = (districtId: string) => {
    setDistrictId(districtId);
    const districtSelect = districts.find((p) => p.id === districtId);
    setValue("district", districtSelect ? districtSelect.name : "");
  };
  const handleSelectWard = (wardId: string) => {
    setWardId(wardId);
    const wardSelect = wards.find((p) => p.id === wardId);
    setValue("ward", wardSelect ? wardSelect.name : "");
  };
  return (
    <div className="w-full gap-x-3 flex items-center">
      <SelectCustom
        name="province"
        control={control}
        data={provincesData}
        valueField="label"
        keyField="id"
        placeholder="Tỉnh/Thành phố"
        onChange={(value) => handleSelectProvince(value)}
      />
      <SelectCustom
        name="district"
        control={control}
        data={districtsData}
        valueField="label"
        keyField="id"
        placeholder="Quận/Huyện"
        onChange={(value) => handleSelectDistrict(value)}

      />
      <SelectCustom
        name="ward"
        control={control}
        data={wardsData}
        valueField="label"
        keyField="id"
        placeholder="Phường/Xã"
        onChange={(value) => handleSelectWard(value)}

      />
    </div>
  );
}

export default LocationSelect;
