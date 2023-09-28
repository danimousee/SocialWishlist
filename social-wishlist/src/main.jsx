import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// Redux
import { Provider } from "react-redux";
import store from "./store/store.js";
// Styles
import "./index.css";
import "./template/css/style.css";
// Routes
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
// Firebase
import { db } from "./firebase";

// EJEMPLO FIREBASE
// import * as product_queries from "./firebase/queries/products.js"

// product_queries.addProduct(db, {
//   id: "BBB-001",
//   name: "Apple Watch",
//   provider: "Facebook Market"
// });

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</RouterProvider>
	</Provider>
);
