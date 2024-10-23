import { CookieKeys } from "@/components/models/cookie.model";
import { environment } from "@/service/env";
import axios, { AxiosError, AxiosResponse } from "axios";
import {parseCookies} from "nookies"
const axiosInstance = axios.create({
  baseURL: environment.baseUrl,
});
axiosInstance.interceptors.request.use(
  config => {
   const cookies = parseCookies()
    const userData = cookies[CookieKeys.USER_TOKEN]
    if (userData) {
      config.headers['Authorization'] = 'Bearer ' + userData
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

// const setRequestHeaders = (token: string | null = null) => {
//   //  Request interceptor
//   axiosInstance.interceptors.request.use(
//       (config: any) => {
//         const cookies = parseCookies()
//         const userData = cookies["userData"]
//           if (userData) {
//               const headers = config.headers
//               headers["Authorization"] = "Bearer " + userData
//           }

//           return config
//       },
//       (error: any) => {
//           // Handle request errors here
//           console.log("Error", error.request?.status)
//           return error.request
//       }
//   )
// }

// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => {
//       // Handle successful responses here
//       return response
//   },
//   (error: AxiosError<any>) => {
//       // Handle response errors here

//       return error.response
//   }
// )
// export {setRequestHeaders}
export default axiosInstance;


