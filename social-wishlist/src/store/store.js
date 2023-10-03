import { configureStore } from '@reduxjs/toolkit';
import products  from '../actions/products';

const store =  configureStore({
  reducer: {
    products,
  },
});
 
export default store;