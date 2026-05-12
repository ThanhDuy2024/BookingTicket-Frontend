import axios from "axios";

const axiosForm = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

export default axiosForm;