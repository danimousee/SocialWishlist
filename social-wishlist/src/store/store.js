import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from '../actions/products';

export default configureStore({
  reducer: {
    products: productsReducer,
  },
});
