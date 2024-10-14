import { axiosInstance } from "@/configs/axiosInstance";

export async function handleLogout() {
  try {
    const data = await axiosInstance.post("/auth/logout");
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
}
