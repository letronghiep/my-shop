import { axiosInstance } from "@/configs/axiosInstance";
import { apiOrigin } from "@/constants";
interface IFormRegister {
  usr_name: string;
  usr_password: string;
  usr_full_name?: string
}
export async function registerUser(formData: IFormRegister) {
  // Implement login logic here
  try {
    const response = await axiosInstance.post(
      `${apiOrigin}/auth/signup`,
      formData
    );
    const data = await response.data;
    return data;
  } catch (error) {
       return error

  }
}
