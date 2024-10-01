
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';
import PetTable from '../../componts/PetTable';
import useAxiosSecure from '../../hooks/axios/useAxiosSecure';
import useMyPets from '../../hooks/mypets/useMyPets';
import useUser from '../../hooks/userInfo/useUser';




export default function MyaddPet() {
    const axiosSecure = useAxiosSecure()
    const { displayName, email, photoURL } = useUser();
    const [mypets, refetch]=useMyPets()

    // const { data: mypets = [], refetch } = useQuery({
    //     queryKey: ["mypets", email],
    //     queryFn: async () => {
    //         const response = await axiosSecure.post(`/mypets`, { email })
    //         return response.data
    //     },
    //     refetchInterval: (data) => {
    //         // If data is empty, refetch every 10 seconds
    //         return !data || data.length === 0 ? 10000 : false  // 10 seconds
    //     },
    //     refetchOnWindowFocus: false, // Prevent refetch on window focus
    //     retry: false, // Disable retrying on failure
    // })

    const handleDeletePet = (pet) => {
        const petCategory = pet.petCategory.value
        const id = pet._id
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const deletepet = await axiosSecure.delete(`/${petCategory}/${id}`)
                if (deletepet.data.acknowledged) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Pet has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }
            }
        });

    };

    const handleAdoptPet = (petId) => {
        // Logic to mark pet as adopted
        // setPets(pets.map(pet => pet.id === petId ? { ...pet, adopted: true } : pet));
    };
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">My Added Pets : {mypets.length}</h1>
            <div className="overflow-x-auto text-black">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-black font-bold text-lg'>
                            <th>
                            </th>
                            <th>Name</th>
                            <th>Pet category</th>
                            <th>Adoption Status</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {mypets.map((pet, index) => <PetTable key={pet._id} pet={pet} handleDeletePet={handleDeletePet} onAdoptPet={handleAdoptPet} index={index}></PetTable>)}
                    </tbody>
                </table>
            </div>
            {/* Tooltips rendered outside the table structure */}
            <Tooltip id="tooltip-update" content="Update" />
            <Tooltip id="tooltip-delete" content="Delete" />
            <Tooltip id="tooltip-adopted" content="Adopted" />

            
        </div>
    )
}
