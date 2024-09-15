import {
    createBrowserRouter,
} from "react-router-dom";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import ErrorPage from "../pages/Error/ErrorPage";
import Home from "../pages/home/Home";
import Root from "../pages/root/Root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },{
                path:"/login",
                element:<Login></Login>
            },{
                path:"/register",
                element:<Register></Register>
            }
        ]
    },
]);
export default router
