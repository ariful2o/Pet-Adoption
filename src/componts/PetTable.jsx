import React from 'react';
import { GrUpdate } from "react-icons/gr";
import { MdOutlinePets } from "react-icons/md";
import { RiChatDeleteLine } from "react-icons/ri";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function PetTable({ pet, index }) {
    const { name, image, breed, status, petCategory } = pet
    console.log(pet)
    //     The table will show Serial Number, Pet name, Pet category, Pet image, Adoption
    // Status, and three buttons
    return (
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
                <button data-tooltip-id="my-tooltip" data-tooltip-content="Update" className="btn btn-ghost hover:bg-accent text-xl text-black"><GrUpdate /></button>
                <button data-tooltip-id="my-tooltip" data-tooltip-content="Delete" className="btn btn-ghost hover:bg-error text-xl text-black"><RiChatDeleteLine /></button>
                <button data-tooltip-id="my-tooltip" data-tooltip-content="Adopted" className="btn btn-ghost hover:bg-secondary text-xl text-black"><MdOutlinePets /></button>
            </th>
            <Tooltip id="my-tooltip" />
        </tr>
    )
}
