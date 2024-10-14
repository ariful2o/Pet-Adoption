import {
    createBrowserRouter
} from "react-router-dom";
import AdminHome from "../dashboard/admin/AdminHome";
import AllDonation from "../dashboard/admin/AllDonation";
import AllPets from "../dashboard/admin/AllPets";
import AllUsers from "../dashboard/admin/AllUsers";
import Dashboard from "../dashboard/Dashboard";
import AddPet from "../dashboard/user/AddPet";
import AdoptRequest from "../dashboard/user/AdoptRequest";
import DonationForm from "../dashboard/user/DonationForm";
import EditDonationForm from "../dashboard/user/EditDonationForm";
import MyaddPet from "../dashboard/user/MyaddPet";
import MyCampaigns from "../dashboard/user/MyCampaigns";
import MyDonations from "../dashboard/user/MyDonations";
import UpdatePet from "../dashboard/user/UpdatePet";
import PrivateRoute from "../hooks/privateRoute/PrivateRoute";
import Adoption from "../pages/adoption/Adoption";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import AddBlog from "../pages/blogs/AddBlog";
import BlogDetails from "../pages/blogs/BlogDetails";
import Blogs from "../pages/blogs/Blogs";
import CatList from "../pages/catList/CatList";
import Contacts from "../pages/contacts/Contacts";
import Details from "../pages/details/Details";
import DogList from "../pages/dogList/DogList";
import DonationCampaigns from "../pages/donationCampaigns/DonationCampaigns";
import DonationDetails from "../pages/donationCampaigns/DonationDetails";
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
            }, {
                path: "/login",
                element: <Login></Login>
            }, {
                path: "/register",
                element: <Register></Register>
            }, {
                path: "/doglist",
                element: <DogList></DogList>
            }, {
                path: "/catlist",
                element: <CatList></CatList>,
            }, {
                path: "/:path/:id",
                element: <Details />,
                loader: ({ params }) => fetch(`http://localhost:5000/${params.path}/${params.id}`)
            }, {
                path: "/profile",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            }, {
                path: "/shop",
                element: <Shop></Shop>
            }, {
                path: "/adoption",
                element: <Adoption></Adoption>
            }, {
                path: "DonationCampaigns",
                element: <DonationCampaigns></DonationCampaigns>
            }, {
                path: "/DonationCampaigns/donationDetails/:id",
                element: <PrivateRoute><DonationDetails /></PrivateRoute>,
            }, {
                path: "/Contacts",
                element: <Contacts></Contacts>
            }, {
                path: "/blog",
                element: <Blogs></Blogs>
            }, {
                path: "addblog",
                element: <PrivateRoute><AddBlog /></PrivateRoute>
            }, {
                path: "/blogs/:id",
                element: <BlogDetails />,
            }
        ]
    }, {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            // admin routes
            {
                path: "/dashboard/users",
                element: <PrivateRoute><AllUsers></AllUsers></PrivateRoute>
            }, {
                path: "/dashboard/alldonations",
                element: <PrivateRoute><AllDonation /></PrivateRoute>
            }, {
                path: "/dashboard/allpets",
                element: <PrivateRoute><AllPets /></PrivateRoute>
            }, {
                path: "/dashboard/adminhome",
                element: <PrivateRoute><AdminHome /></PrivateRoute>
            },
            // user routes
            {
                path: "/dashboard/addpet",
                element: <PrivateRoute><AddPet></AddPet></PrivateRoute>
            }, {
                path: "/dashboard/mypet",
                element: <PrivateRoute><MyaddPet></MyaddPet></PrivateRoute>
            }, {
                path: "/dashboard/updatepet/:id",
                element: <PrivateRoute><UpdatePet /></PrivateRoute>
            }, {
                path: "/dashboard/adoprionrequest",
                element: <PrivateRoute><AdoptRequest /></PrivateRoute>
            }, {
                path: "/dashboard/donationform",
                element: <PrivateRoute><DonationForm /></PrivateRoute>
            }, {
                path: "/dashboard/mycampaigns",
                element: <PrivateRoute><MyCampaigns /></PrivateRoute>
            }, {
                path: "/dashboard/editdonationform",
                element: <PrivateRoute><EditDonationForm /></PrivateRoute>
            }, {
                path: "/dashboard/mydonations",
                element: <PrivateRoute><MyDonations /></PrivateRoute>
            }
        ]
    }
]);
export default router
