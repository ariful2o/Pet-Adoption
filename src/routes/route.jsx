import {
    createBrowserRouter,
} from "react-router-dom";
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
            },
        ]
    },
]);
export default router
