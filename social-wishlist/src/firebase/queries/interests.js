import { db } from "../index";
import { collection, doc, addDoc, getDocs, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import {fetchInterestsStart, fetchInterestsSuccess, fetchInterestsFailure,
        addInterestStart, addInterestSuccess, addInterestFailure, 
        deleteInterestStart, deleteInterestSuccess, deleteInterestFailure} from "../../actions/interests";
import { addProduct } from "./products";

//---
const COLLECTION_NAME = "interests";

//Metodos a desarrollar.
//getAllInterests
export const getAllInterests = () => async (dispatch) => {
    dispatch(fetchInterestsStart());
  
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      const interests = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      dispatch(fetchInterestsSuccess(interests));
    } catch (error) {
      dispatch(fetchInterestsFailure(error.message));
    }
  };
  
//getInterest
export async function getInterest(db, id) {
	const docRef = doc(db, COLLECTION_NAME, id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		console.log("Document data:", docSnap.data());
		return docSnap.data();
	} else {
		console.log("No such Interest!");
	}
}

//getUserInterests
export const getUserInterests = async (userId) => {
    const interestsRef = collection(db, `users/${userId}/interests`);
    const querySnapshot = await getDocs(interestsRef);
  
    const userInterests = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  
    return userInterests;
  };

//addInterestToUser
export async function addInterestToUser(db, payload, userId) {
	let docRef;
	const path = `users/${userId}/interests`;
	if (payload.id) {
		docRef = await setDoc(doc(db, path, payload.id), payload);
	} else {
		docRef = await addDoc(collection(db, path), payload);
	}
}

//deleteInterestOfUser
export async function deleteInterestOfUser(db, interestId, userId) {
    const path = `users/${userId}/interests/${interestId}`;
    
    try {
      await deleteDoc(doc(db, path));
      console.log("Interest deleted successfully");
    } catch (error) {
      console.error("Error deleting interest", error);
    }
  }

//uploadInterestToDB
export async function uploadInterestsToDB(db, interests) {
	interests.forEach((interest) => {
		addProduct(db, interest);
	});
}

//deleteProductFromDB
export async function deleteInterest(db, id) {
	try {
		await deleteDoc(doc(db, COLLECTION_NAME, id));
		console.log("document deleted", id);
	} catch (error) {
		console.error("Error deleting interest", error);
	}
}

//editInterest
export async function editInterest(interestId, updatedInterest) {
    const interestRef = doc(db, 'interests', interestId);
  
    try {
      await updateDoc(interestRef, updatedInterest);
      console.log('Interest updated successfully:', interestId);
    } catch (error) {
      console.error('Error updating interest:', error);
    }
  }