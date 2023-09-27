import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDnyN4h6LCt6opICyzmDy1dtLwpk_ltBOY",
	authDomain: "social-wishlist.firebaseapp.com",
	projectId: "social-wishlist",
	storageBucket: "social-wishlist.appspot.com",
	messagingSenderId: "955434871757",
	appId: "1:955434871757:web:3fadf73a8255d5a67fb284",
};

function initializeFirebase() {
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);

	return { app, db };
}

// Necesitamos inicializar Firebase cada vez que recargue la página
export default initializeFirebase;
