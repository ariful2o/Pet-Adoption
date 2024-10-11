import React from 'react'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../hooks/axios/useAxiosSecure'
import useMyDonations from '../../hooks/myDonations/useMyDonations'

export default function MyDonations() {
    const [myDonations, isLoading,refetch] = useMyDonations()
    const axiosSecure = useAxiosSecure()
    if (isLoading) return <div>Loading...</div>

    const handleDelete = (id) => {

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
                const deleteDonation = await axiosSecure.delete(`/deletedonation/${id}`)
                if (deleteDonation.data.acknowledged) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your donation has been deleted.",
                        icon: "success"
                    });
                }
            }
        });



    }
    return (
        <>
            <h2 className='text-black text-xl p-5' >My Donations : {myDonations.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-black'>
                            <th>

                            </th>
                            <th>Pet Image</th>
                            <th>Pet Name</th>
                            <th>Donated amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myDonations.map((item, index) => {
                                return (
                                    <tr key={item._id}>
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
                                                            src={item.petPicture}
                                                            alt={item.petName} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.petName}
                                        </td>
                                        <td>${item.currentDonation}</td>
                                        <th>
                                            <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-xs">Remove</button>
                                        </th>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}
