import { collection, doc, addDoc, getDoc, getDocs, deleteDoc, updateDoc, setDoc, query, where } from "firebase/firestore";
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
			await updateDoc(docRef, { id: docRef.id });
		}
		// console.log("docRef", docRef);
		dispatch(addProductsSuccess());
		return docRef.id;
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

export async function getProductOfUser(userId, productId) {
	const docRef = doc(db, `users/${userId}/products/${productId}`);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		throw new Error("Document does not exist");
	}
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

export async function removeProductFromUser(db, payload, userId) {
	const path = `users/${userId}/products/${payload.id}`;
	await deleteDoc(doc(db, path));
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

export async function getInterestProducts(userId) {
	const interests = collection(db, `users/${userId}/interests`);
	const interestsQuerySnapshot = await getDocs(interests);
	
	const productsRef =  collection(db, COLLECTION_NAME);

	const ids = interestsQuerySnapshot.docs.map((doc) => doc.id);
	const q = query(productsRef, where('category', 'in', ids));
	// console.log(ids);
	const productsQuerySnapshot = await getDocs(q);
	// console.log(productsQuerySnapshot);

	let interestProducts = productsQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Obtiene productos normales
    const normalQuery = query(productsRef, where('category', 'not-in', ids));
    const normalProductsSnapshot = await getDocs(normalQuery);
    let normalProducts = normalProductsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Combina ambos conjuntos de productos
    let combinedProducts = [...interestProducts, ...normalProducts];

    // Aquí puedes ajustar la lógica si necesitas limitar el número total de productos devueltos
    // Por ejemplo, si hay un límite específico de productos que quieres devolver, puedes recortar el array combinado
    // combinedProducts = combinedProducts.slice(0, totalProductLimit);
	console.log('combinados',combinedProducts)
    return combinedProducts;
}

export async function productExistsInUser(userId, productId) {
	const docRef = doc(db, `users/${userId}/products/${productId}`);
	const docSnap = await getDoc(docRef);
	return docSnap.exists();
}
