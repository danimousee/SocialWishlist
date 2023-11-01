import { configureStore } from "@reduxjs/toolkit";
import products from "../actions/products";
import user from "../actions/user";
import users from "../actions/users";
import interests from "../actions/interests";

const store = configureStore({
	reducer: {
		products,
		user,
		users,
		interests,
	},
});

export default store;
