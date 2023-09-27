import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
};

const fetchProducts = () => {
  return [{}, {}, {}];
};

// reducers
export const productsReducer = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const actions = {
  fetchProducts: createAsyncThunk("fetchProducts", async () => {
    // codigo david
}),
};

// Thunk functions/actions
/*   export const getProducts = () => (dispatch) => {
      dispatch(getProductsList())
  }
   */

// Selectors
export const selectors = {
    productsList: (state) => state.products,
}
export default productsReducer.reducer;
