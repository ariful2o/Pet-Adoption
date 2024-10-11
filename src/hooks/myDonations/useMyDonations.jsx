import React from 'react'
import { useQuery } from 'react-query'
import useAxiosSecure from '../axios/useAxiosSecure'
import useUser from '../userInfo/useUser'

export default function useMyDonations() {
    const axiosSecure=useAxiosSecure()
    const {email}=useUser()

    const {data:myDonations=[],isLoading,refetch}=useQuery({
        queryKey:['myDonations'],
        queryFn: async () => {
            const response=await axiosSecure.get(`/myDonations?email=${email}`)
            return response.data
        }
    })
  return [myDonations,isLoading,refetch]
}
