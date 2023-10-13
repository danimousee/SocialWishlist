import { configureStore } from "@reduxjs/toolkit";
import products from "../actions/products";
import user from "../actions/user";

const store = configureStore({
	reducer: {
		products,
		user,
	},
});

export default store;
