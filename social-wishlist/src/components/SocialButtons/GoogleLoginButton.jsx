import React from "react";
import googleLogo from "../../img/google-logo_white.svg";

function GoogleLoginButton({ handleGoogleSignIn }) {
	const styles = {
		backgroundColor: "#ce4232",
		display: "flex",
		alignItems: "center",
		gap: "20px",
		maxWidth: "280px",
		height: "60px",
	};

	const logoStyles = {
		height: "35px",
	};

	return (
		<button style={styles} onClick={handleGoogleSignIn}>
			<img src={googleLogo} style={logoStyles} />
			<h4 style={{ margin: "0px" }}>Ingresar con Google</h4>
		</button>
	);
}

export default GoogleLoginButton;
