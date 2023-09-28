import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
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

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

