import { createBrowserRouter, redirect } from 'react-router-dom'
import App from '../App'
import Home from '../components/Home'


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/SocialWhistlist",
                element: <Home />
            }
        ]

    }


])

export default router
