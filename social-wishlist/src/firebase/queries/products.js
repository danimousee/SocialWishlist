import { collection, doc, addDoc, getDoc, getDocs, deleteDoc, updateDoc, setDoc } from "firebase/firestore";

const COLLECTION_NAME = "products";

export async function getAllProducts(db) {
	const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));

	if (querySnapshot.size === 0) {
		console.log(COLLECTION_NAME, "collection is empty.");
	}

	querySnapshot.forEach((doc) => {
		console.log(`${doc.id} => ${doc.data()}`);
	});
}

export async function getProduct(db, id) {
	const docRef = doc(db, COLLECTION_NAME, id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		console.log("Document data:", docSnap.data());
	} else {
		console.log("No such document!");
	}
}

export async function addProduct(db, payload) {
	try {
		let docRef;
		if (payload.id) {
			docRef = await setDoc(doc(db, COLLECTION_NAME, payload.id), payload);
			console.log("Document written with ID: ", payload.id);
		} else {
			docRef = await addDoc(collection(db, COLLECTION_NAME), payload);
			console.log("Document written with ID: ", docRef.id);
		}
	} catch (e) {
		console.error("Error adding document: ", e);
	}
}

export async function editProduct(db, id, payload) {
	try {
		await updateDoc(doc(db, COLLECTION_NAME, id), payload);
		console.log("document edited", id);
	} catch (error) {
		console.error("Error updating document", error);
	}
}

export async function deleteProduct(db, id) {
	try {
		await deleteDoc(doc(db, COLLECTION_NAME, id));
		console.log("document deleted", id);
	} catch (error) {
		console.error("Error deleting document", error);
	}
}