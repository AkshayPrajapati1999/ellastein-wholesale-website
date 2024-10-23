// import { environment } from "./env";
// import axios from "axios";
// import axiosInstance from "@/axiosIntersepter/axiosIntersepter";
// import { ApiRoutes } from "@/components/models/common.enum";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { Product } from "@/components/models/product.model";
// export interface ICategory {
//     id: number;
// }
// // export const getCategories = async (): Promise<ICategory[] | null> => {
// //     try {
// //         const response = await axiosInstance.get(`${ApiRoutes.GET_ALL_CATEGORY}`);

// //         if (response.status === 200) {
// //             return response.data as ICategory[];
// //         } else {
// //             return null;
// //         }
// //     } catch (error) {
// //         console.error('Failed to get categories. Error:', error);
// //         return null;
// //     }
// // };
// //  export const fetchProducts = createAsyncThunk("fetch/products", async () => {
// //     debugger
// //     const response = await axios.get<Product[]>(`${environment.baseUrl}/products`);
// //     return response.data;
// //   });


// //   export const fetchProducts = createAsyncThunk("fetch/products", async () => {
// //     try {
// //       const response = await axiosInstance.get(`${ApiRoutes.GET_ALL_CATEGORY}`);

// //       if (response.status === 200) {
// //           return response.data as ICategory[];
// //       } else {
// //           return null;
// //       }
// //   } catch (error) {
// //       console.error('Failed to get categories. Error:', error);
// //       return null;
// //   }
// // });