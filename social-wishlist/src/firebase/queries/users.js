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

export async function existsUser(db, id) {
	const docSnap = await getDoc(doc(db, COLLECTION_NAME, id));
	var userExists = false;
	if (docSnap.exists()) {
		userExists = true;
	} 
	return userExists;
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

// --- FRIENDS ---
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
	// We call the operations asynchronously since they do not depend on one another
	removeFriendRequest(requesterId, receiverId);

	// Adding friend to receiverId
	const receiverRef = doc(db, COLLECTION_NAME, receiverId);
	const updatePayload = {};
	updatePayload["friends." + requesterId] = requesterId;
	updateDoc(receiverRef, updatePayload);

	// Also add the friend in the requesterId document!
	const requesterRef = doc(db, COLLECTION_NAME, requesterId);
	const updatePayload2 = {};
	updatePayload2["friends." + receiverId] = receiverId;
	updateDoc(requesterRef, updatePayload2);
}
export async function removeFriend(myId, friendId) {
	// Removing friend
	const myRef = doc(db, COLLECTION_NAME, myId);
	const deletePayload = {};
	deletePayload["friends." + friendId] = deleteField();
	updateDoc(myRef, deletePayload);

	// Also remove from friend document
	const friendRef = doc(db, COLLECTION_NAME, friendId);
	const deletePayload2 = {};
	deletePayload2["friends." + myId] = deleteField();
	updateDoc(friendRef, deletePayload2);
}
export async function getFriendRequests(myId) {
	// Returns the friend requests user documents (ONLY uid, displayName and photoURL)
	const myRef = doc(db, COLLECTION_NAME, myId);
	const docSnap = await getDoc(myRef);
	if (docSnap.exists()) {
		const friendRequestsIds = docSnap.data().friendRequests;
		const friendRequestsIdsArray = friendRequestsIds ? Object.keys(friendRequestsIds) : [];
		if (friendRequestsIdsArray.length > 0) {
			const usersRef = collection(db, COLLECTION_NAME);
			const q = query(usersRef, where("uid", "in", friendRequestsIdsArray));
			const querySnapshot = await getDocs(q);
			const friendRequestsData = querySnapshot.docs.map((docSnap) => {
				const docData = docSnap.data();
				return { uid: docData.uid, displayName: docData.displayName, photoURL: docData.photoURL };
			});
			return friendRequestsData;
		}
		return [];
	} else {
		throw new Error("Document with id " + id + " does not exist.");
	}
}
export async function getFriends(myId) {
	// Returns the friends user documents (ONLY uid, displayName and photoURL)
	const myRef = doc(db, COLLECTION_NAME, myId);
	const docSnap = await getDoc(myRef);
	if (docSnap.exists()) {
		const friendsIds = docSnap.data().friends;
		const friendsIdsArr = friendsIds ? Object.keys(friendsIds) : [];
		if (friendsIdsArr.length > 0) {
			const usersRef = collection(db, COLLECTION_NAME);
			const q = query(usersRef, where("uid", "in", friendsIdsArr));
			const querySnapshot = await getDocs(q);
			const friendsData = querySnapshot.docs.map(docSnap => {
				const docData = docSnap.data();
				return { uid: docData.uid, displayName: docData.displayName, photoURL: docData.photoURL };
			});
			return friendsData;
		}
		return [];
	} else {
		throw new Error("Document with id " + id + " does not exist.");
	}
}
