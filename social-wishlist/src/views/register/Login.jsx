import { H2 } from "../../components/Styles.css";
import logo from "./../../img/logo.png";
import "./Login.css";
import React, { useState } from "react";
import GoogleLoginButton from "../../components/SocialButtons/GoogleLoginButton";
import { googleSignIn } from "../../firebase/auth/googleAuth";
import { useDispatch } from "react-redux";
import { userLogIn } from "../../actions/user";
import { useNavigate } from "react-router-dom";

function Login() {
	const [loginPressed, setLoginPressed] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleGoogleSignIn = () => {
		setLoginPressed(true);
		googleSignIn().then((res) => {
			setLoginPressed(false);
			dispatch(userLogIn(res));
			// redirect to profile
			navigate('/profile');
		});
	};

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
