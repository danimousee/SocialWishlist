import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

export const signInWithGoogle = async () => {
	const result = await FirebaseAuthentication.signInWithGoogle();
	return result.user;
};

export const signOut = async () => {
	await FirebaseAuthentication.signOut();
};

export const getCurrentUser = async () => {
	const result = await FirebaseAuthentication.getCurrentUser();
	return result.user;
};
