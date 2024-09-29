import React, { useState } from 'react'
import { useQuery } from 'react-query';
import PetTable from '../../componts/PetTable';
import useAxiosSecure from '../../hooks/axios/useAxiosSecure';
import useUser from '../../hooks/userInfo/useUser';

export default function MyaddPet() {
    const user = useUser();
    const axiosSecure = useAxiosSecure()
    const email = user.email

    const { data: mypets = [] } = useQuery({
        queryKey: ["mypets", email],
        queryFn: async () => {
            const response = await axiosSecure.post(`/mypets`, { email })
            return response.data
        },
        refetchInterval: (data) => {
            // If data is empty, refetch every 10 seconds
            return !data || data.length === 0 ? 10000 : false  // 10 seconds
        },
        refetchOnWindowFocus: false, // Prevent refetch on window focus
        retry: false, // Disable retrying on failure
    })

    console.log(user.email, mypets);






    const handleDeletePet = (petId) => {
        // Logic to delete pet from your data source
        // setPets(pets.filter(pet => pet.id !== petId));
    };

    const handleUpdatePet = (petId) => {
        // Logic to redirect to update page
        // console.log("Update pet with ID:", petId);
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
                        {mypets.map((pet, index) => <PetTable key={pet._id} pet={pet} onDeletePet={handleDeletePet} onUpdatePet={handleUpdatePet} onAdoptPet={handleAdoptPet} index={index}></PetTable>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
