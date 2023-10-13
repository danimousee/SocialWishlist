import { auth } from "../index";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

auth.languageCode = auth.useDeviceLanguage();

const googleProvider = new GoogleAuthProvider();

export function googleSignIn() {
	return signInWithPopup(auth, googleProvider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user.providerData[0];
			return user;
			// IdP data available using getAdditionalUserInfo(result)
			// ...
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
}

export function googleSignOut(){
    return signOut(auth)
}