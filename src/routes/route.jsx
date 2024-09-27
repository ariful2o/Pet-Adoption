import {
    createBrowserRouter,
} from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../hooks/privateRoute/PrivateRoute";
import Adoption from "../pages/adoption/Adoption";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Blogs from "../pages/blogs/Blogs";
import Breeder from "../pages/breeder/Breeder";
import CatList from "../pages/catList/CatList";
import Contacts from "../pages/contacts/Contacts";
import DogList from "../pages/dogList/DogList";
import ErrorPage from "../pages/Error/ErrorPage";
import Home from "../pages/home/Home";
import Root from "../pages/root/Root";
import Shop from "../pages/shop/Shop";

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
            },{
                path:"/doglist",
                element:<DogList></DogList>
            },{
                path:"/catlist",
                element:<CatList></CatList>
            },{
                path:"/shop",
                element:<Shop></Shop>
            },{
                path:"/adoption",
                element:<Adoption></Adoption>
            },{
                path:"/breeder",
                element:<Breeder></Breeder>
            },{
                path:"/Contacts",
                element:<Contacts></Contacts>
            },{
                path:"/blog",
                element:<Blogs></Blogs>
            }
        ]
    },{
        path: "/dashboard",
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            
        ]
    }
]);
export default router
