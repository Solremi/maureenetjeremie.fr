import axios from 'axios';

const baseURL = (import.meta as any).env.VITE_API_URL as string;

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default axiosInstance;
