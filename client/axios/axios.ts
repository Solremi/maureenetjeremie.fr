import axios from 'axios';

const baseURL = (import.meta as any).env.VITE_API_URL as any;

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;
