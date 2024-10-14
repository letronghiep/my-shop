import { axiosInstance } from "@/configs/axiosInstance";
import { apiOrigin } from "@/constants";

export async function getRoleUser(id: string) {
  try {
    const response = await axiosInstance.get(`${apiOrigin}/rbac/role/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
}
