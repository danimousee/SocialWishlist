import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

const COLLECTION_NAME = "users";

export async function getAllUsers(db) {
	// No trycatch because we want the parent to handle the error
	const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
	const response = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	return response;
}

export async function getUser(db, id) {
	const docSnap = await getDoc(doc(db, COLLECTION_NAME, id));
	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		throw new Error("Document with id " + id + " does not exist.");
	}
}

export async function addUser(db, payload) {
	let docRef;

	if (payload.uid) {
		docRef = await setDoc(doc(db, COLLECTION_NAME, payload.uid), payload);
	} else {
		docRef = await addDoc(collection(db, COLLECTION_NAME), payload);
	}
}

export async function editUser(db, id, payload) {
	await updateDoc(doc(db, COLLECTION_NAME, id), payload);
}

export async function deleteUser(db, id) {
	await deleteDoc(doc(db, COLLECTION_NAME, id));
}
