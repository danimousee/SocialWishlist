import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// MUI
import { StyledEngineProvider } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// Redux
import { Provider } from "react-redux";
import store from "./store/store.js";
// Styles
import "./index.css";
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
	<StyledEngineProvider injectFirst>
		<Provider store={store}>
			<RouterProvider router={router}>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</RouterProvider>
		</Provider>
	</StyledEngineProvider>
);
