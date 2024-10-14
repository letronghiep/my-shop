import { FieldError, UseFormRegister } from "react-hook-form";
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
  placeholder: string;
  name: ValidFieldNames | string;
  register: UseFormRegister<T>;
  error?: FieldError | undefined;
  valueAsNumber?: boolean;
}

export type ValidFieldNames =
  | "username"
  | "password"
  | "rememberMe"
  | "confirmPassword";

export interface IUser {
  _id?: string;
  usr_id?: Number;
  usr_name?: string;
  usr_slug?: string;
  usr_full_name?: string;
  usr_password?: string;
  usr_salt?: string;
  usr_email?: string;
  usr_date_of_birth?: string;
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
