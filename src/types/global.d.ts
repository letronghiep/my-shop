import { StringGradients } from "antd/es/progress/progress";
import { Control, FieldError, UseFormRegister } from "react-hook-form";
export interface INotificationItem {
  id?: string;
  title: string;
  content: string;
  createdAt?: Date;
  className?: string;
  link?: string;
}

export interface INotification {
  className?: string;
  notifications: INotificationItem[];
}

export type FormData = {
  username: string;
  password: string;
  rememberMe?: boolean;
  confirmPassword?: string;
};

export interface FormFieldProps {
  type?: string;
  placeholder?: string;
  name: ValidFieldNames | string;
  register?: UseFormRegister<T>;
  error?: FieldError | undefined;
  valueAsNumber?: boolean;
  options?: React.PropsWithChildren<any>;
  label?: string;
  control?: Control<T>;
}

export type ValidFieldNames =
  | "username"
  | "password"
  | "rememberMe"
  | "confirmPassword";

export interface IUser {
  _id?: string;
  usr_id?: number;
  usr_name?: string;
  usr_slug?: string;
  usr_full_name?: string;
  usr_password?: string;
  usr_salt?: string;
  usr_email?: string;
  usr_date_of_birth?: Date;
  usr_phone?: string;
  usr_sex?: string;
  usr_wishList?: Array;
  usr_avatar?: string;
  usr_role?: string;
  usr_status?: string;
  received_address?: string;
  sent_address?: string;
}
export type TokenProps = {
  accessToken?: string;
  client_id?: string;
};
export interface TokenData {
  userId: string;
  usr_name: string;
  role: string;
  iat: number;
  exp: number;
}
export interface IGeoInfo {
  user_adjusted: boolean;
  region: {
    lat: number;
    lng: number;
  };
}
export interface IShipping {
  _id?: string;
  user_id?: string;
  name: string;
  phone: string;
  address?: string;
  city: string;
  district: string;
  ward: string;
  country?: string;
  zip?: string;
  geo_info?: IGeoInfo;
  shipping_id?: string;
  is_delivery_address?: boolean;
  is_return_address?: boolean;
}
// location
export interface ILocation {
  id: string;
  name: string;
  name_en: string;
  full_name: string;
  full_name_en: string;
  latitude: number;
  longitude: number;
}
export interface IMetadataObj<T> {
  metadata: T;
}
export interface IMetadataArray<T> {
  limit: number;
  currentPage: number;
  totalRows: number;
  totalPages: number;
  data: T[];
  toLoad?: string; // Tùy chọn nếu có trường này trong response
}
export interface IDataMessage {
  message: string;
  metadata: T | IMetadataArray<T>;
  status: number;
}
