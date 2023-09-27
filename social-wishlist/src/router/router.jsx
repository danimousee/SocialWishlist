import { createBrowserRouter, redirect } from 'react-router-dom'
import App from '../App'
import Login from '../components/register/Login'
import Register from '../components/register/Register'
import ProductList from '../components/products/ProductList'
import ProductDetail from '../components/products/ProductDetail'
import Profile from '../components/profile/Profile'

const router = createBrowserRouter([
    {
        path: "/SocialWishlist",
        element: <App />
    },
    {
        path: "/SocialWishlist/Login",
        element: <Login />,
    },
    {
        path: "/SocialWishlist/Register",
        element: <Register />,
    },
    {
        path: "/SocialWishlist/List",
        element: <ProductList />,
    },
    {
        path: "/SocialWishlist/Detail",
        element: <ProductDetail />,
    },
    {
        path: "/SocialWishlist/Profile",
        element: <Profile />,
    }

])

export default router
