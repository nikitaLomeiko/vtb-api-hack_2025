import axios from 'axios'
import { baseURL, timeout } from './consts'

export const baseApi = axios.create({
  baseURL,
  timeout,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// baseApi.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error(
//       'API Error:',
//       error.response?.data?.message || error.message,
//       `Status: ${error.response?.status}`
//     )
//     return Promise.reject(error)
//   }
// )
