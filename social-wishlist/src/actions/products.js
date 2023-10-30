// products.js
import { createSlice } from '@reduxjs/toolkit';

const products = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
    page: 0,
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
    addProductsSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    addProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    incrementPage(state) {
      state.page = state.page + 1;
    },
    resetPage(state) {
      state.page = 0;
    },
  },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure ,addProductsStart, addProductsSuccess, addProductsFailure, incrementPage, resetPage } = products.actions;
export default products.reducer;