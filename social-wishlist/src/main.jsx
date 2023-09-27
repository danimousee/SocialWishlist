import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// Redux
import { Provider } from "react-redux";
import store from "./store/store.js";
// Styles
import "./index.css";
import "./template/css/style.css";
// Routes
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
// Firebase
import initializeFirebase from "./firebase";
import product_queries from "./firebase/queries/products.js";


// PROVISORIO: Ejemplo de uso de Firestore
const product = {
  id: "AAA-001",
  name: "Pulsera",
  description: "Alta pulsera papu",
  provider: "Mercadolibre",
};

const { app, db } = initializeFirebase();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

product_queries.addProduct(db, product);

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
