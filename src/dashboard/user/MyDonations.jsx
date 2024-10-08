import React from 'react'
import useMyDonations from '../../hooks/myDonations/useMyDonations'

export default function MyDonations() {
    const [myDonations, isLoading] = useMyDonations()
    if (isLoading) return <div>Loading...</div>
    // console.log(myDonations)
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
                                            <button className="btn btn-ghost btn-xs">Remove</button>
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
