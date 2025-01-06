import axios from "axios"

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,headers:{"Content-Type" : "application/json"},
  withCredentials: true,
});

axiosClient.interceptors.request.use(function (requestConfig) {
  const token = localStorage.getItem('token');
  if (token) {
    requestConfig.headers.Authorization = 'Bearer ' + token;
  }
  return requestConfig;
})

export default axiosClient;