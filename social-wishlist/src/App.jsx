import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import { userLogIn } from "./actions/user";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(userLogIn(user.providerData[0]));
			}
		});
	}, []);

	return (
		<>
			<Outlet />
			<Nav />
		</>
	);
}

export default App;
