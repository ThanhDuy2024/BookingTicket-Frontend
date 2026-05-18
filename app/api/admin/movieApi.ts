import axiosInstance from "@/app/lib/axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GetMovie = async (page: any, status: string, search: string, duration: string, imdbRating: string) => {
  console.log(duration)
  const response = await axiosInstance.get(`/admin/movie/list?search=${search}&duration=${duration}&country=&status=${status}&imdbRating=${imdbRating}&page=${page}&limit=5`);
  return response.data;
}