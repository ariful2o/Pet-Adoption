import React from 'react'
import { useQuery } from 'react-query'
import useAxiosSecure from '../../hooks/axios/useAxiosSecure'
import useUser from '../../hooks/userInfo/useUser'

export default function AdoptRequest() {
  const axiosSecure = useAxiosSecure()
  const {email}=useUser()
  const body={email}

  const {data:request=[],refetch}=useQuery({
    queryKey:['adoptionRequest'],
    queryFn: async () => {
      const response=await axiosSecure.post(`/adoptrequests/`,body)
      return  response.data
    },
    refetchInterval: (data) => {
      // If data is empty, refetch every 10 seconds
      return !data || data.length === 0 ? 10000 : false  // 10 seconds
    },
    refetchOnWindowFocus: false, // Prevent refetch on window focus
  })

  // console.log("---->",data)
  return (
    <div>
      {request.map(req=>{
console.log(req.requestPet)
      })}
    </div>
  )
}
