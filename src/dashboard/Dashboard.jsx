import {
    FaBook,
    FaCalendarAlt,
    FaCalendarCheck,
    FaHome,
    FaList,
    FaShoppingCart,
    FaUsers,
} from "react-icons/fa";
import {
    MdOutlineFoodBank,
    MdOutlinePayment,
    MdOutlineRateReview,
} from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/isAdmin/useAdmin";

export default function Dashboard() {
    const [isAdmin,isPending]=useAdmin();

    return (
        <div className="flex">
            <div className="">
                {isAdmin &&
                    <div className="bg-[#28282f] max-w-60 p-5  text-white">
                        <ul className="space-y-4 menu uppercase">
                            <>
                                <li>
                                    <NavLink to="/">
                                        <FaHome />
                                        Admin Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addItem">
                                        <MdOutlineFoodBank />
                                        Add Item
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageitems">
                                        <FaList />
                                        Manage Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">
                                        <FaBook />
                                        Manage Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/users">
                                        <FaUsers />
                                        All Users
                                    </NavLink>
                                </li>
                            </>
                        </ul>
                    </div>
                }
                <div className={isAdmin ? "bg-[#1d1d3e] max-w-60 p-5 text-white" : "bg-[#1d1d3e] max-w-60 p-5 text-white h-screen items-center flex flex-row"}>
                    <ul className="space-y-4 menu uppercase">
                        <>
                            <li>
                                <NavLink to="/">
                                    <FaHome />
                                    Add a pet
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/">
                                    <FaCalendarAlt />
                                    reservation
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/paymenthistory">
                                    <MdOutlinePayment />
                                    Payment History
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/mycart">
                                    <FaShoppingCart />
                                    My Cart
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/">
                                    <MdOutlineRateReview />
                                    add review
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/">
                                    <FaCalendarCheck />
                                    my booking
                                </NavLink>
                            </li>
                        </>
                    </ul>
                </div>
            </div>
            <div className="flex-1 bg-[#E8E8E8]">
                <Outlet></Outlet>
            </div>
        </div>
    )
}
1. 
2. My added pets
3. Adoption Request
4. Create Donation Campaign
5. My Donation Campaigns
6. My Donations