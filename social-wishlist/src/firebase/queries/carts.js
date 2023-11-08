import {
	addDoc,
	collection,
	deleteDoc,
	deleteField,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "../index";

export async function getCart(userId) {
	const querySnapshot = await getDocs(collection(db, `users/${userId}/cart`));
	const response = querySnapshot.docs.map((docSnap) => ({
		id: docSnap.id,
		...docSnap.data(),
	}));
	return response;
}

export async function markProduct(markerUid, wisherUid, product) {
	// Agregar producto a cart
	const cartProduct = {
		...product,
		wisherUid,
	};
	const cartProductRef = doc(db, `users/${markerUid}/cart/${product.id}`);
	await setDoc(cartProductRef, cartProduct);
	
	// Marcar producto en wisher
	const wisherProductRef = doc(db, `users/${wisherUid}/products/${product.id}`);
	await updateDoc(wisherProductRef, { markerUid });
}

export async function unmarkProduct(markerUid, wisherUid, product) {
	// Delete from marker
	const docRef = doc(db, `users/${markerUid}/cart/${product.id}`);
	await deleteDoc(docRef);

	// Delete from wisher
	const wisherDocRef = doc(db, `users/${wisherUid}/products/${product.id}`);
	const deletePayload = {
		markerUid: deleteField(),
	};
	await updateDoc(wisherDocRef, deletePayload);
}
