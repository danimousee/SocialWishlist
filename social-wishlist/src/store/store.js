import { configureStore } from "@reduxjs/toolkit";
import products from "../actions/products";
import user from "../actions/user";
import users from "../actions/users";

const store = configureStore({
	reducer: {
		products,
		user,
		users,
	},
});

export default store;
