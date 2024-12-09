import { axiosInstance } from "@/configs/axiosInstance";
import { apiOrigin } from "@/constants";
import { IUser } from "@/types/global";
export async function getMe() {
  try {
    const response = await axiosInstance.get(`${apiOrigin}/user/me`);
    if (response.status === 200) {
      const data = await response.data;
      return data;
    } else {
      return response;
    }
  } catch (error) {
    return error;
  }
}
export async function updateUserToShop(user: IUser) {
  try {
    const res = await axiosInstance.post(`${apiOrigin}/user/seller`, user);
    const data = await res.data;
    return data;
  } catch (error) {
    return error;
  }
}
export async function updateUserInfo(userId: string, user: IUser) {
  try {
    const res = await axiosInstance.put(
      `${apiOrigin}/user/update/${userId}`,
      user
    );
    console.log(res);
    const data = await res.data;
    return data;
  } catch (error) {
    return error;
  }
}
