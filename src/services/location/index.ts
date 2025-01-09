import axios from "axios";

export async function getProvince() {
  try {
    const res = await axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
export async function getDistrict(provinceId: string) {
  try {
    const res = await axios.get(
      "https://esgoo.net/api-tinhthanh/2/" + provinceId + ".htm"
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getWard(districtId: string) {
  try {
    const res = await axios.get(
      "https://esgoo.net/api-tinhthanh/3/" + districtId + ".htm"
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

// get full info
// https://esgoo.net/api-tinhthanh/4/1/1/1.htm
export async function getDetailWard() {
  try {
    const res = await axios.get("https://esgoo.net/api-tinhthanh/4/0.htm");
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

// lay phuong quan tinh
export async function getNeighborhood(id: string) {
  try {
    const res = await axios.get(
      "https://esgoo.net/api-tinhthanh/5/" + id + ".htm"
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
