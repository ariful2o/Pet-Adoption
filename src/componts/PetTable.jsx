import React from 'react';
import { GrUpdate } from "react-icons/gr";
import { MdOutlinePets } from "react-icons/md";
import { RiChatDeleteLine } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import 'react-tooltip/dist/react-tooltip.css';

export default function PetTable({ pet, index, handleDeletePet }) {
    const { name, image, breed, status, petCategory, _id } = pet;

    return (
        <>
            <tr>
                <th>
                    <label>
                        {index + 1}
                    </label>
                </th>
                <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                                <img
                                    src={image}
                                    alt={name} />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{name}</div>
                            <div className="text-sm opacity-50">{breed}</div>
                        </div>
                    </div>
                </td>
                <td>
                    {petCategory.label}
                </td>
                <td>{status}</td>
                <th>

                    <NavLink to={`/dashboard/updatepet/${_id}`}>
                        <button data-tooltip-id="tooltip-update" className="btn btn-ghost hover:bg-accent text-xl text-black">
                            <GrUpdate />
                        </button>
                    </NavLink>
                    <button onClick={() => handleDeletePet(pet)} data-tooltip-id="tooltip-delete" className="btn btn-ghost hover:bg-error text-xl text-black">
                        <RiChatDeleteLine />
                    </button>
                    <button data-tooltip-id="tooltip-adopted" className="btn btn-ghost hover:bg-secondary text-xl text-black">
                        <MdOutlinePets />
                    </button>
                </th>
            </tr>


        </>
    );
}
