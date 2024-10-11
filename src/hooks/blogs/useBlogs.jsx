import React from 'react'
import { useQuery } from 'react-query'
import useAxiosPublic from '../axios/useAxiosPublic'

export default function useBlogs() {
    const axiosPublic =useAxiosPublic()

    const {data:blogs=[],isLoading,refetch,isError}=useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const response = await axiosPublic.get('/blogs')
            return response.data
        },
        refetchInterval:(data)=>{
            // If data is empty, refetch every 10 seconds
            return !data || data.length === 0? 10000 : false  // 10 seconds
        },
        refetchOnWindowFocus: false, // Prevent refetch on window focus
        retry: false, // Disable retrying on failure
    })
  return {blogs,isLoading,refetch,isError}
}
