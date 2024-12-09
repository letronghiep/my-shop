import { TokenData } from "@/types/global";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function checkUserRole() {
  const refreshToken = cookies().get('refreshToken');
  if(!refreshToken) return 's00003';
  const verify: TokenData = jwtDecode(refreshToken.value);
  return verify.role;
}