import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    user: {},
    loggedIn: false,
    error: null,
    cart: [],
    cartLoaded: false
  },
  reducers: {
    userLogIn(state, action){
      state.loggedIn = true;
      state.user = action.payload;
    },
    userLogOut(state){
      state.user = {};
      state.cart = [];
      state.cartLoaded = false;
      state.loggedIn = false;
    },
    userRefresh(state, action) {
      state.user = action.payload
    },
    loadCart(state, action) {
      state.cart = action.payload.slice();
      state.cartLoaded = true;
    },
    addToCart(state, action) {
      const product = action.payload;
      const alreadyInCart = state.cart.find(p => p.id === product.id)
      if (!alreadyInCart) {
        state.cart.push(product);
      }
    },
    removeFromCart(state, action) {
      const product = action.payload;
      state.cart = state.cart.filter(p => p.id !== product.id);
    }
  },
});

export const { userLogIn, userLogOut, userRefresh, loadCart, addToCart, removeFromCart } = user.actions;
export default user.reducer;