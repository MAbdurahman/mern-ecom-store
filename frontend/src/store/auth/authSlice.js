import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
   isAuthenticated: false,
   isLoading: true,
   user: null
};

export const signUpUser = createAsyncThunk(
   '/auth/sign-up',

   async (formData) => {
      const response = await axios.post(
         'http://localhost:5000/api/v1.0/auth/sign-up',
         formData,
         {
            withCredentials: true
         }
      );

      return response.data;
   }
);

export const signInUser = createAsyncThunk(
   '/auth/sign-in',

   async (formData) => {
      const response = await axios.post(
         'http://localhost:5000/api/v1.0/auth/sign-in',
         formData,
         {
            withCredentials: true
         }
      );

      return response.data;
   }
);

export const signOutUser = createAsyncThunk(
   '/auth/sign-out',

   async () => {
      const response = await axios.post(
         'http://localhost:5000/api/v1.0/auth/sign-out',
         {},
         {
            withCredentials: true
         }
      );

      return response.data;
   }
);

export const validateAccess = createAsyncThunk(
   '/auth/validate-access',

   async () => {
      const response = await axios.get(`http://localhost:5000/api/v1.0/auth/validate-access`, {
         withCredentials: true,
         headers: {
            'Cache-Control':
               'no-store, no-cache, must-revalidate, proxy-revalidate'
         },
      });

      return response.data;
   }
);


const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setUser: (state, action) => {}
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
         .addCase(signInUser.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(signInUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success;
         })
         .addCase(signInUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
         })
         .addCase(validateAccess.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(validateAccess.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success;
         })
         .addCase(validateAccess.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
         })
         .addCase(signOutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
         });
   }
});

export const {setUser} = authSlice.actions;
export default authSlice.reducer;