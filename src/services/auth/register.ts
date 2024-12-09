import { axiosInstance } from "@/configs/axiosInstance";
import { apiOrigin } from "@/constants";
import { SignUpFormType } from "@/schemas/SignUpSchema";
interface IFormRegister {
  usr_name: string;
  usr_password: string;
  usr_full_name?: string
}
export async function registerUser(formData: SignUpFormType) {
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
