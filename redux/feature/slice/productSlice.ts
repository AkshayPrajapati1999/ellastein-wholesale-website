// import { STATUS } from "@/constant/status";
// import { environment } from "@/service/env";
// import { fetchProducts } from "@/service/product.service";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// interface Product {
//     id: number;
//     title: string;
//     price: number;
//     description: string;
//   }
  
//   interface ProductState {
//     status: string;
//     products: Product[];
//   }
  
//   const initialState: ProductState = {
//     status: STATUS.IDLE,
//     products: [],
//   };
  
//   // export const fetchProducts = createAsyncThunk("fetch/products", async () => {
//   //   debugger
//   //   const response = await axios.get<Product[]>(`${environment.baseUrl}/products`);
//   //   return response.data;
//   // });
  
//   const productSlice = createSlice({
//     name: "products",
//     initialState,
//     reducers: {}, 
//     extraReducers: (builder) => {
//       builder
//         .addCase(fetchProducts.pending, (state) => {
//           state.status = STATUS.LOADING;
//         })
//         .addCase(fetchProducts.fulfilled, (state, action) => {
//           state.products = action.payload;
//           state.status = STATUS.IDLE;
//         })
//         .addCase(fetchProducts.rejected, (state) => {
//           state.status = STATUS.ERROR;
//         });
//     },
//   });
  
//   export default productSlice.reducer;