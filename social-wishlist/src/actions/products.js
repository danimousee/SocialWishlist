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
      state.loading = true;
    },
    fetchProductsSuccess(state, action) {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addProductsStart(state) {
      state.loading = true;
    },
    addProductsSuccess(state, action) {
      state.loading = false;
      state.error = null;
    },
    addProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure ,addProductsStart, addProductsSuccess, addProductsFailure } = products.actions;
export default products.reducer;