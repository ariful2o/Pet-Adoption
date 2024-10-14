import {
    FaHome,
    FaList, FaUsers
} from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { FcHome } from "react-icons/fc";
import { IoIosGitPullRequest } from "react-icons/io";
import { LiaDonateSolid } from "react-icons/lia";
import {
    MdOutlineCampaign,
    MdPets, MdPlaylistAddCheckCircle
} from "react-icons/md";

import { Helmet } from "react-helmet-async";
import { SiBookmyshow } from "react-icons/si";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/isAdmin/useAdmin";

export default function Dashboard() {
    const [isAdmin, isPending] = useAdmin();

    const navlists = <>
        <div className="">
            {isAdmin &&

                <>
                    <li>
                        <NavLink to="/dashboard/adminhome">
                            <FaHome />
                            Admin Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/allpets">
                            <FaList />
                            All Pets
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/alldonations">
                            <FaSackDollar />
                            All Donations
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/users">
                            <FaUsers />
                            All Users
                        </NavLink>
                    </li>
                </>
            }

            <>
                <li>
                    <NavLink to="/">
                        <FcHome />
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/addpet">
                        <MdPets />
                        Add a pet
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/mypet">
                        <MdPlaylistAddCheckCircle />
                        My added pets
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/adoprionrequest">
                        <IoIosGitPullRequest />
                        Adoption Request
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/donationform">
                        <MdOutlineCampaign />
                        Create Donation Campaign
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/mycampaigns">
                        <SiBookmyshow />
                        My Donation Campaigns
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/mydonations">
                        <LiaDonateSolid />
                        My Donations
                    </NavLink>
                </li>
            </>
        </div>
    </>

    return (
        <>
            <Helmet>
                <title>Pet Adoption | Dashboard</title>
            </Helmet><div className="flex">
                <div className="">

                    <div className="navbar bg-base-100">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h8m-8 6h16" />
                                    </svg>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    {navlists}
                                </ul>
                            </div>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1 lg:min-h-screen">
                                {navlists}
                            </ul>
                        </div>

                    </div>
                </div>
                <div className="flex-1 bg-[#E8E8E8]">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}




