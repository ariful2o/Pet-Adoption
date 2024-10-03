import { async } from '@firebase/util';
import React from 'react';
import { FcCancel, FcOk } from "react-icons/fc";
import { useQuery } from 'react-query';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/axios/useAxiosPublic';
import useAxiosSecure from '../../hooks/axios/useAxiosSecure';
import useMyRequest from '../../hooks/myRequest/useMyRequest';
import useUser from '../../hooks/userInfo/useUser';

export default function AdoptRequest() {
  const axiosSecure = useAxiosSecure()
  const { email } = useUser()
  const axiosPublic = useAxiosPublic()
  const [myRequest, refetch] = useMyRequest()

  const { data: request = [] } = useQuery({
    queryKey: ['adoptionRequest'],
    queryFn: async () => {
      const response = await axiosSecure.post(`/adoptrequests/`, { email })
      return response.data
    },
    refetchInterval: (data) => {
      // If data is empty, refetch every 10 seconds
      return !data || data.length === 0 ? 10000 : false  // 10 seconds
    },
    refetchOnWindowFocus: false, // Prevent refetch on window focus
  })


  const haldleAccept = async (ids) => {
    const petId = ids.petId
    const requestId = ids.requestId
    const petCategory = ids.petCategory.value
    console.log(petCategory)

    const updateStatus = { status: "Adopted" }

    const updatePetStatus = await axiosSecure.put(`/updateStatus/${petCategory}/${petId}`, updateStatus)
    if (updatePetStatus.data.acknowledged) {

      const upddteStatus = { status: "Accepted" }
      const updateReqestStatus = await axiosSecure.put(`/adoptrequests/${requestId}`, updateStatus)

      if (updateReqestStatus.data.acknowledged) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Adoption Request has been accepted",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }

  }

  const handleCancle = async (id) => {
    const calcelRequest = await axiosPublic.delete(`/cancel/${id}`)
    console.log(id)
    if (calcelRequest.data.acknowledged) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Adoption Request has been canceled",
        showConfirmButton: false,
        timer: 1500
      });
      refetch()
    }
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="">My Pet Request</h2>
      <table className="table">
        {/* head */}
        <thead>
          <tr className='text-gray-900'>
            <th>

            </th>
            <th>Name</th>
            <th>Request By</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            request.length ?
              request.map((req, index) => {
                const { name, image, breed, _id, petCategory } = req?.requestPet
                const { address, date, email, name: username, phone, _id: userid } = req?.requestUser
                const newdate = date.split('T')[0]
                const accepted = { petId: _id, requestId: userid, petCategory }
                // console.log(req.requestPet.petCategory);
                return (
                  <tr key={_id} className="hover">
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
                          <div className="font-bold text-black">{name}</div>
                          <div className="text-sm opacity-100">{breed}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h6 className='text-black'> {username}</h6>
                      <br />
                      <span className="text-gray-500">{email}</span>
                    </td>
                    <td className='text-gray-600'>{address}</td>
                    <th className='text-gray-500'>
                      {phone}
                    </th>
                    <th>
                      {newdate}
                    </th>
                    <th>
                      <button onClick={() => haldleAccept(accepted)} className="btn btn-ghost btn-md text-2xl" data-tooltip-id="tooltip-accept"><FcOk /></button>
                      <button className="btn btn-ghost btn-md text-2xl" data-tooltip-id="tooltip-delete"><FcCancel /></button>
                    </th>
                  </tr>
                )
              })
              :
              <tr>
                <td colSpan="7" className="text-center text-gray-600 text-xl">No pending requests found</td>
              </tr>
          }
          {
            myRequest.map((req, index) => {
              const { name, address, date, email, petId, phone, _id: userid, status } = req
              const dateSliet = date.split("T")[0]
              return (
                <tr key={userid} className="hover">
                  <th>
                    <label>
                      {index + 1}
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-black">{name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <h6 className='text-black'> {email}</h6>

                  </td>
                  <td className='text-gray-600'>{address}</td>
                  <th className='text-gray-500'>
                    {phone}
                  </th>
                  <th>
                    {dateSliet}
                  </th>
                  <th>
                    <button className="btn btn-ghost btn-md text-lg" data-tooltip-id="tooltip-accept">{status}</button>
                    <button onClick={() => handleCancle(userid)} className="btn btn-ghost btn-md text-2xl" data-tooltip-id="tooltip-delete"><FcCancel /></button>
                  </th>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <Tooltip id="tooltip-accept" content={status} />
      <Tooltip id="tooltip-delete" content="Cancel" />
    </div>
  )
}
