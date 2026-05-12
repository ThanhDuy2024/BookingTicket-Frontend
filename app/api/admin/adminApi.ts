import axiosInstance from "@/app/lib/axios"

export const LoginApi = async (email: string, password: string) => {
  const response = await axiosInstance.post("/admin/auth/login", {
    email: email,
    password: password
  });
  return response.data;
}