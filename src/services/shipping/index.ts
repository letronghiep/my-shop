import { axiosInstance } from "@/configs/axiosInstance";
import { apiOrigin } from "@/constants";
import { IShipping } from "@/types/global";

export async function createShipping(shipping: IShipping) {
  try {
    const res = await axiosInstance.post(`${apiOrigin}/shipping`, shipping);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function getShipping() {
  try {
    const res = await axiosInstance.get(`${apiOrigin}/shipping`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function getShippingDetail(shippingId: string) {
  try {
    const res = await axiosInstance.get(`${apiOrigin}/shipping/${shippingId}`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateShipping(shippingId: string, shipping: IShipping) {
  try {
    const res = await axiosInstance.patch(
      `${apiOrigin}/shipping/${shippingId}`,
      shipping
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function removeShippingService(shippingId: string) {
  // Delete logic here
  const res = await axiosInstance.delete(
    `${apiOrigin}/shipping/${shippingId}`
  );
  const data = await res.data;
  return data;
}

export async function updateDefaultShipping(shippingId: string) {
  try {
    const res = await axiosInstance.patch(
      `${apiOrigin}/shipping/default/${shippingId}`
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}