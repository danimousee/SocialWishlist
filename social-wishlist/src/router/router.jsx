import { createBrowserRouter, redirect } from 'react-router-dom'
import Home from "../views/Home/Home"
import Login from '../views/register/Login'
import Register from '../views/register/Register'
import ProductList from '../views/products/ProductList'
import ProductDetail from '../views/products/ProductDetail'
import Profile from '../views/profile/Profile'
import Error404 from '../views/Error404/Error404'
import App from '../App'
import Search from '../views/Search/Search'
import Add from '../views/Add/Add'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error404/>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/product-list",
                element: <ProductList />,
            },
            {
                path: "/detail",
                element: <ProductDetail />,
            },
            {
                path: "/search",
                element: <ProductList />,
            },
            {
                path: "/add",
                element: <Add />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
        ]
    },
])

export default router
