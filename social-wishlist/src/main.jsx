import React from 'react'
import ReactDOM from 'react-dom/client'
import './template/css/style.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
