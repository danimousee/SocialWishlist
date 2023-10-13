import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// MUI
import { StyledEngineProvider } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
// import * as userQueries from "./firebase/queries/users.js"
// import meliProducts from "../mock/meliProducts.js"

// const allUsers = userQueries.getAllUsers(db);
// console.log("allUsers:", allUsers);

// userQueries.addUser(db, {
// 	id: "aaa001",
// 	displayName: "David Choi",
// 	email: "david.choi@mail.com"
// });

// userQueries.addUser(db, {
// 	id: "aaa002",
// 	displayName: "Carina Shin",
// 	email: "carina.shin@mail.com"
// });

// userQueries.editUser(db, 'aaa001', {
// 	email: "the_monster@email.com"
// })

// userQueries.deleteUser(db, "aaa002");

// MUI custom theme
const theme = createTheme({
	palette: {
		primary: {
			main: "#fff",
			light: "#42a5f5",
			dark: "#1565c0",
			contrastText: "#fff",
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<StyledEngineProvider injectFirst>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<RouterProvider router={router}>
					<React.StrictMode>
						<App />
					</React.StrictMode>
				</RouterProvider>
			</Provider>
		</ThemeProvider>
	</StyledEngineProvider>
);
