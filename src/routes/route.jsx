import {
    createBrowserRouter
} from "react-router-dom";
import AllUsers from "../dashboard/admin/AllUsers";
import Dashboard from "../dashboard/Dashboard";
import AddPet from "../dashboard/user/AddPet";
import MyaddPet from "../dashboard/user/MyaddPet";
import PrivateRoute from "../hooks/privateRoute/PrivateRoute";
import Adoption from "../pages/adoption/Adoption";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Blogs from "../pages/blogs/Blogs";
import Breeder from "../pages/breeder/Breeder";
import CatList from "../pages/catList/CatList";
import Contacts from "../pages/contacts/Contacts";
import Details from "../pages/details/Details";
import DogList from "../pages/dogList/DogList";
import ErrorPage from "../pages/Error/ErrorPage";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
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
                element:<CatList></CatList>,
            },{
                path: "/:path/:id",
                element: <Details />,
                loader: ({ params }) => fetch(`http://localhost:5000/${params.path}/${params.id}`)
              },{
                path:"/profile",
                element:<PrivateRoute><Profile></Profile></PrivateRoute>
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
            // admin routes
            {
                path:"/dashboard/users",
                element:<PrivateRoute><AllUsers></AllUsers></PrivateRoute>
            },
            // user routes
            {
                path:"/dashboard/addpet",
                element:<PrivateRoute><AddPet></AddPet></PrivateRoute>
            },{
                path:"/dashboard/mypet",
                element:<PrivateRoute><MyaddPet></MyaddPet></PrivateRoute>
            }
        ]
    }
]);
export default router
