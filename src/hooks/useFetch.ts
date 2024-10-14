import { useState, useEffect } from "react";
import { axiosInstance } from "@/configs/axiosInstance";
import { AxiosResponse, AxiosError } from "axios";

type ApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
};

function useFetch<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axiosInstance.get(url);
        setData(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error);
        } else {
          setError(null); // Có thể xử lý lỗi khác ở đây nếu muốn
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
}
export default useFetch