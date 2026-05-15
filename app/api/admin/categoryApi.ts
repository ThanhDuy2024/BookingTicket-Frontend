import axiosInstance from "@/app/lib/axios"

export const GetCategory = async () => {
  const response = await axiosInstance.get("/admin/category/list?search=&status=&page=1&limit=2");
  return response.data;
}