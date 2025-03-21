import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
   isLoading: false,
   productList: [],
};

export const addProduct = createAsyncThunk(
   '/products/add-product',
   async (formData) => {
      const result = await axios.post(
         'http://localhost:5000/api/v1.0/admin/products/add-product', formData,
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );

      return result?.data;
   }
);

export const getAllProducts = createAsyncThunk(
   '/products/get-products',
   async () => {
      const result = await axios.get(
         'http://localhost:5000/api/v1.0/admin/products/get-products',
      );

      return result?.data;
   }
);

export const updateProduct = createAsyncThunk(
   '/products/update-product/:productId',
   async ({ productId, formData }) => {
      const result = await axios.put(
         `http://localhost:5000/api/v1.0/admin/products/update-product/${productId}`,
         formData,
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );

      return result?.data;
   }
);

export const deleteProduct = createAsyncThunk(
   "/products/delete-product/:productId",
   async (productId) => {
      const result = await axios.delete(
         `http://localhost:5000/api/v1.0/admin/products/delete-product/${productId}`
      );

      return result?.data;
   }
);


const adminProductSlice = createSlice({
   name: 'adminProduct',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllProducts.pending, (state) => {
            state.loading = true;
         })
         .addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.productList = action.payload?.data;
         })
         .addCase(getAllProducts.rejected, (state, action) => {
            state.loading = false;
            state.productList = [];
         });
   }
});

export default adminProductSlice.reducer;