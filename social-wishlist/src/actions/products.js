import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../firebase/queries/products.js";

const initialState = {
  products: [],
  loading: false,
};

// reducers
export const productsReducer = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(actions.fetchProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(actions.fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
    });
    builder.addCase(actions.fetchProducts.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const actions = {
  fetchProducts: createAsyncThunk("fetchProducts", async () => {
    getAllProducts();
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
};
export default productsReducer.reducer;
