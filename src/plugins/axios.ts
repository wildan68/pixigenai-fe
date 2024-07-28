import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:3001',
  timeout: 1000,
})

export const setAuthorizationHeader = (token: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default axiosInstance