import axiosInstance from "@/app/lib/axios"

export const GetCategory = async (search: string, status: string, page: string) => {
  const response = await axiosInstance.get(`/admin/category/list?search=${search}&status=${status}&page=${page}&limit=5`);
  return response.data;
}