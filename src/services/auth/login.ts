import { axiosInstance } from "@/configs/axiosInstance";
import { FormData } from "@/schemas/SignInSchema";
export async function login(formData: FormData) {
  // Implement login logic here
  try {
    const response = await axiosInstance.post(`/auth/login`, formData);
    if (response.status === 200) {
      const data = await response.data;
      return data;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}
export async function handleRefreshToken() {
  try {
    const response = await axiosInstance.get("/auth/refreshToken");
    if (response.status === 200) {
      const data = await response.data;
      return data;
    }
  } catch (error) {
    return error;
  }
}
