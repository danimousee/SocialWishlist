import { addDoc, collection, deleteDoc, deleteField, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../index";
import { searchUsers } from "../../utils/users";

const COLLECTION_NAME = "users";

export async function getAllUsers(input = undefined) {
	// No trycatch because we want the parent to handle the error
	const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
	const response = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	const data = searchUsers(input, response);

	console.log("users data", data);

	return data;
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

export async function sendFriendRequest(requesterId, receiverId) {
	const receiverRef = doc(db, COLLECTION_NAME, receiverId);
	const updatePayload = {};
	updatePayload["friendRequests." + requesterId] = requesterId;
	// I have a map inside a document
	await updateDoc(receiverRef, updatePayload);
}
export async function removeFriendRequest(requesterId, receiverId) {
	const receiverRef = doc(db, COLLECTION_NAME, receiverId);
	const deletePayload = {};
	// This actually works. LOL!
	deletePayload["friendRequests." + requesterId] = deleteField();
	await updateDoc(receiverRef, deletePayload);
}
export async function acceptFriendRequest(requesterId, receiverId) {
	await removeFriendRequest(requesterId, receiverId);
	const receiverRef = doc(db, COLLECTION_NAME, receiverId);
	const updatePayload = {};
	updatePayload["friends." + requesterId] = requesterId;
	await updateDoc(receiverRef, updatePayload);
}
export async function removeFriend(friendId, myId) {
	const myRef = doc(db, COLLECTION_NAME, myId);
	const deletePayload = {};
	deletePayload["friends." + friendId] = deleteField();
	await updateDoc(myRef, deletePayload);
}
export async function getFriendRequests(myId) {
	const myRef = doc(db, COLLECTION_NAME, myId);
	const docSnap = await getDoc(myRef);
	if (docSnap.exists()) {
		return docSnap.data().friendRequests;
	} else {
		throw new Error("Document with id " + id + " does not exist.");
	}
}
export async function getFriends(myId) {
	const myRef = doc(db, COLLECTION_NAME, myId);
	const docSnap = await getDoc(myRef);
	if (docSnap.exists()) {
		return docSnap.data().friends;
	} else {
		throw new Error("Document with id " + id + " does not exist.");
	}
}
