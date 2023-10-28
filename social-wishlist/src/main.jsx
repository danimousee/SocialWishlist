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

// const myId = "LNNGa7GTnMPTHVCKN68dm9KoJmb2"
// await userQueries.sendFriendRequest("requester", myId)
// await userQueries.sendFriendRequest("requester2", myId)
// await userQueries.sendFriendRequest("requester3", myId)
// await userQueries.sendFriendRequest("requester4", myId)
// await userQueries.removeFriendRequest("requester4", myId)
// await userQueries.acceptFriendRequest("requester", myId)
// await userQueries.acceptFriendRequest("requester2", myId)
// await userQueries.removeFriend("requester2", myId)
// console.log(await userQueries.getFriendRequests(myId))
// console.log(await userQueries.getFriends(myId))

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
