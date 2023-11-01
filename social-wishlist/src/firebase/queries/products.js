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
import { searchProducts } from "../../utils/products";
const COLLECTION_NAME = "products";

//Funcion de mezclado
function shuffleArray(array) {
	let shuffledArray = array.slice();
	for (let i = shuffledArray.length - 1; i > 0; i--) {
	  const j = Math.floor(Math.random() * (i + 1));
	  [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
}

export const getAllProducts = (input = null) => async (dispatch) => {
	dispatch(fetchProductsStart());

		try {
			const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
			const response = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			const data = searchProducts(input, response);
			const shuffledData = shuffleArray(data);

			dispatch(fetchProductsSuccess(shuffledData));
		} catch (error) {
			dispatch(fetchProductsFailure(error.message));
		}
	};

export async function getProduct(db, id) {
	const docRef = doc(db, COLLECTION_NAME, id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		console.log("Document data:", docSnap.data());
		return docSnap.data();
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
		// console.log("docRef", docRef);
		dispatch(addProductsSuccess());
	} catch (e) {
		dispatch(addProductsFailure(e));
	}
};

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
	products.forEach((product) => {
		addProduct(db, product);
	});
}

export function compressProductsMELI(meliProducts) {
	const compressedProductsMELI = meliProducts.map((meliProduct) => {
		return {
			id: meliProduct.id,
			name: meliProduct.title,
			images: [meliProduct.thumbnail],
			provider: "MELI",
			url: meliProduct.permalink,
		};
	});
	return compressedProductsMELI;
}

export async function addProductToUser(db, payload, userId) {
	let docRef;
	const path = `users/${userId}/products`;
	if (payload.id) {
		docRef = await setDoc(doc(db, path, payload.id), payload);
	} else {
		docRef = await addDoc(collection(db, path), payload);
	}
}

export async function getProductsOfUser(userId) {
	const productsRef = collection(db, `users/${userId}/products`);
	const querySnapshot = await getDocs(productsRef);

	const userProducts = querySnapshot.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data(),
		};
	});

	return userProducts;
}
