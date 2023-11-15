import { H2 } from "../../components/Styles.css";
import logo from "./../../img/logo.png";
import "./Login.css";
import React, { useState } from "react";
import GoogleLoginButton from "../../components/SocialButtons/GoogleLoginButton";
import { googleSignIn } from "../../firebase/auth/googleAuth";
import { useDispatch } from "react-redux";
import { userLogIn } from "../../actions/user";
import { useNavigate } from "react-router-dom";
import { addUser, getUser } from "../../firebase/queries/users";
import { db } from "../../firebase";
import { existsUser } from "../../firebase/queries/users";
import { signInWithGoogle } from "../../firebase/auth/capGoogleAuth";

function Login() {
	const [loginPressed, setLoginPressed] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleGoogleSignIn = () => {
		setLoginPressed(true);
		if (window.Capacitor.platform === "android") {
			signInWithGoogle().then((user) => {
				setLoginPressed(false);
				var idUser = user.uid;

				//Valido si no existia el usuario antes cde crear
				existsUser(db, user.uid).then((userExists) => {
					console.log("userExists:", idUser);
					if (!userExists) {
						addUser(db, user).then(() => {
							console.log("User saved to DB with id", idUser);
							dispatch(userLogIn(user));
							navigate("/interests");
						});
					} else {
						// Getting rest of the fields from Firestore (friends, cart)
						getUser(db, user.uid).then(userDocument => {
							dispatch(userLogIn({...user, ...userDocument}));
							getCart(user.uid).then(userCart => {
								dispatch(loadCart(userCart));
								navigate("/");
							});
						}).catch(error => {
							navigate("/");
						});
					}
				}).catch((error) => {
					alert("Error saving user:" + error.message);
				});

				
			});
		} else {
			googleSignIn().then((user) => {
				signInFollowUp(user);
			});
		}
	};

	function signInFollowUp(res) {
		setLoginPressed(false);
		var idUser = res.uid;

		try {
			//Valido si no existia el usuario antes cde crear
			existsUser(db, res.uid).then((userExists) => {
				console.log("userExists:", idUser);
				if (!userExists) {
					addUser(db, res).then(() => {
						console.log("User saved to DB with id", idUser);
						navigate("/interests");
					});
				} else {
					navigate("/");
				}
			});
		} catch (error) {
			// Maybe show an error in the client and prompt retry here?
			console.error("Error saving user:", error.message);
		}

		dispatch(userLogIn(res));

		// redirect to profile
		// existsUser(db, res.uid)
		// 	.then((userExists) => {
		// 		console.log("userExists:", idUser);
		// 		if (userExists) {
		// 			navigate("/");
		// 		} else {
		// 			navigate("/interests");
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.error("Error checking user exists:", error.message);
		// 	});
	}

	return (
		<div className="login-box content-box">
			<img className="login-logo" src={logo} alt="Social Wishlist Logo" />
			<H2>Bienvenido/a</H2>
			<div className="center-box">
				<GoogleLoginButton handleGoogleSignIn={handleGoogleSignIn} />
				{loginPressed && <h6>Asegúrate de autorizar las ventanas emergentes en tu navegador.</h6>}
			</div>
		</div>
	);
}

export default Login;
