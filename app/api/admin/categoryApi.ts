/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/app/lib/axios"
import axiosForm from "@/app/lib/axiosForm";

export const GetCategory = async (search: string, status: string, page: string) => {
  const response = await axiosInstance.get(`/admin/category/list?search=${search}&status=${status}&page=${page}&limit=5`);
  return response.data;
}

export const PostCategory = async (formData: any) => {
  const response = await axiosForm.post(`/admin/category/create`, formData);
  return response.data;
}

export const CategoryDetail = async (id: string) => {
  const response = await axiosInstance.get(`/admin/category/detail/${id}`);
  return response.data;
}

export const PutCategory = async (formData: any, id: string) => {
  const response = await axiosForm.put(`/admin/category/update/${id}`, formData);
  return response.data;
}

export const GetCategoryMovie = async () => {
  const response = await axiosInstance.get(`/admin/category/list?search=&status=&page=1&limit=100`);
  return response.data;
}