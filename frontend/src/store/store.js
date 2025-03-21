import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice.js';
import adminProductReducer from './admin/adminProductSlice.js';


const store = configureStore({
   reducer: {
      auth: authReducer,

      adminProduct: adminProductReducer,
   }
});

export default store;