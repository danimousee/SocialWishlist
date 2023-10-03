// products.js
import { createSlice } from '@reduxjs/toolkit';

const products = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchProductsStart(state) {
      console.log("start", state);
      state.loading = true;
    },
    fetchProductsSuccess(state, action) {
      console.log("success", action);
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchProductsFailure(state, action) {
      console.log("failure");
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } = products.actions;
export default products.reducer;