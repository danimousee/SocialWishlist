import { collection, doc, addDoc, getDoc, getDocs, deleteDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../index";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProductsStart,
  addProductsSuccess,
  addProductsFailure,
} from "../../actions/products";
const COLLECTION_NAME = "products";

export const getAllProducts = () => async (dispatch) => {
	dispatch(fetchProductsStart());

	try {
		const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
		const data = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		dispatch(fetchProductsSuccess(data));
	} catch (error) {
		dispatch(fetchProductsFailure(error.message));
	}
};

export async function getProduct(db, id) {
	const docRef = doc(db, COLLECTION_NAME, id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		console.log("Document data:", docSnap.data());
	} else {
		console.log("No such document!");
	}
}

export const addProduct = (payload) => async (dispatch) => {
   dispatch(addProductsStart);

  try {
    let docRef;
    if (payload.id) {
      docRef = await setDoc(doc(db, COLLECTION_NAME, payload.id), payload);
    } else {
      docRef = await addDoc(collection(db, COLLECTION_NAME), payload);
    }
    console.log("docRef", docRef);
    dispatch(addProductsSuccess());
  } catch (e) {
    dispatch(addProductsFailure(e));
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

export async function uploadProductsToDB(db, products) {
  products.forEach(product => {
    addProduct(db, product);
  });
}

export function compressProductsMELI(meliProducts) {
  const compressedProductsMELI = meliProducts.map(meliProduct => {
    return {
      id: meliProduct.id,
      name: meliProduct.title,
      images: [meliProduct.thumbnail],
      provider: "MELI",
      url: meliProduct.permalink
    }
  });
  return compressedProductsMELI;
}
