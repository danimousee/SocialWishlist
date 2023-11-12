import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import { loadCart, userLogIn } from "./actions/user";
import { useDispatch } from "react-redux";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUser } from "./firebase/queries/users";
import { getCart } from "./firebase/queries/carts";
import { getCurrentUser } from "./firebase/auth/capGoogleAuth";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		if (window.Capacitor.platform === "android") {
			getCurrentUser().then(user => {
				handleUserDetected(user);
			})
		} else {
			onAuthStateChanged(auth, async (user) => {
				handleUserDetected(user);
			});
		}
		
	}, []);

	async function handleUserDetected(user) {
		if (user) {
			const reducedUser = {
				uid: user.uid,
				displayName: user.displayName,
				email: user.email,
				emailVerified: user.emailVerified,
				phoneNumber: user.phoneNumber,
				photoURL: user.photoURL,
			};
			const userDocument = await getUser(db, user.uid);
			const userCart = await getCart(user.uid);
			dispatch(userLogIn({...reducedUser, ...userDocument}));
			dispatch(loadCart(userCart));
		}
	}

	return (
		<>
			<Outlet />
			<Nav />
		</>
	);
}

export default App;
