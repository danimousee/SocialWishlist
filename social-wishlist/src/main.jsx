import React from "react";
import ReactDOM from "react-dom/client";
import "./template/css/style.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import initializeFirebase from "./firebase";

import product_queries from "./firebase/queries/products.js";

const { app, db } = initializeFirebase();

// PROVISORIO: Ejemplo de uso de Firestore
const product = {
	id: "AAA-001",
	name: "Pulsera",
	description: "Alta pulsera papu",
	provider: "Mercadolibre",
};

product_queries.addProduct(db, product);

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
