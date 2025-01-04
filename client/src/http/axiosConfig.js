import axios from "axios"

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,headers:{"Content-Type" : "application/json"},
  withCredentials: true,
});
export default axiosClient;