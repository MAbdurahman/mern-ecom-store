
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
   isAuthenticated: false,
   isLoading: false,
   user: null,
};

export const signUpUser = createAsyncThunk(
   '/auth/sign-up',

   async (formData) => {
      const response = await axios.post(
         'http://localhost:5000/api/v1.0/auth/sign-up',
         formData,
         {
            withCredentials: true,
         }
      );

      return response.data;
   }
);













const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setUser: (state, action) => {},
   },
   extraReducers: (builder) => {
      builder
         .addCase(signUpUser.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(signUpUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
         })
         .addCase(signUpUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
         })
   }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;