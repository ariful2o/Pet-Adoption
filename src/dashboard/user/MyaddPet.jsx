
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';
import PetTable from '../../componts/PetTable';
import useAxiosSecure from '../../hooks/axios/useAxiosSecure';
import useUser from '../../hooks/userInfo/useUser';




export default function MyaddPet() {
    const axiosSecure = useAxiosSecure()
    const { email, } = useUser();


    const [page, setPage] = useState(1); // State for current page
    const [limit] = useState(10); // Number of items per page

    const { data, isLoading,  refetch } = useQuery({
        queryKey: ["mypets", page],
        queryFn: async () => {
            const response = await axiosSecure.post(`/mypets?page=${page}&limit=${limit}`, { email });
            return response.data;
        },
        refetchOnWindowFocus: false,
        retry: false,
    });

    const allpets = data?.pets || [];
    const totalPages = data?.totalPages || 1;

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
       console.log(petId);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">My Added Pets : {allpets.length}</h1>
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
                        {allpets.map((pet, index) => <PetTable key={pet._id} pet={pet} handleDeletePet={handleDeletePet} onAdoptPet={handleAdoptPet} index={index}></PetTable>)}
                    </tbody>
                </table>
                <div className="flex justify-between mt-4">
                    <button onClick={handlePrevPage} disabled={page === 1}>
                        Previous
                    </button>
                    <span>Page {page} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={page === totalPages}>
                        Next
                    </button>
                </div>
            </div>
            {/* Tooltips rendered outside the table structure */}
            <Tooltip id="tooltip-update" content="Update" />
            <Tooltip id="tooltip-delete" content="Delete" />
            <Tooltip id="tooltip-adopted" content="Adopted" />


        </div>
    )
}
