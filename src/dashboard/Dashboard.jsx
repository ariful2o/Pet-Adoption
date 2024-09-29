import {
    FaBook, FaHome,
    FaList, FaUsers
} from "react-icons/fa";
import { FcHome } from "react-icons/fc";
import { FaSackDollar } from "react-icons/fa6";
import { HiViewGridAdd } from "react-icons/hi";
import { IoIosGitPullRequest } from "react-icons/io";
import { LiaDonateSolid } from "react-icons/lia";
import {
    MdOutlineCampaign,
    MdOutlineFoodBank, MdPets, MdPlaylistAddCheckCircle
} from "react-icons/md";

import { SiBookmyshow } from "react-icons/si";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/isAdmin/useAdmin";

export default function Dashboard() {
    const [isAdmin,isPending]=useAdmin();

    return (
        <div className="flex">
            <div className="">
                {isAdmin &&
                    <div className="bg-[#28282f] max-w-60 p-1  text-white">
                        <ul className="space-y-4 menu uppercase">
                            <>
                                <li>
                                    <NavLink to="/">
                                        <FaHome />
                                        Admin Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="">
                                        <FaList />
                                        All Pets
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="">
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
                        </ul>
                    </div>
                }
                <div className={isAdmin ? "bg-[#1d1d3e] max-w-60 p-5 text-white" : "bg-[#1d1d3e] max-w-60 p-5 text-white h-screen items-center flex flex-row"}>
                    <ul className="space-y-4 menu uppercase">
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
                                <NavLink to="">
                                    <IoIosGitPullRequest />
                                    Adoption Request
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                   <MdOutlineCampaign  />
                                  Create Donation Campaign
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                   <SiBookmyshow />
                                     My Donation Campaigns
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                   <LiaDonateSolid />
                                    My Donations
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