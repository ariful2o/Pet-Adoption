import React from 'react'
import { useQuery } from 'react-query';
import useAuth from '../auth/useAuth'
import useAxiosPublic from '../axios/useAxiosPublic';

export default function useAdmin() {
    const {user}=useAuth();
    const axiosPublic=useAxiosPublic()

    const {data:isAdmin,isPending}=useQuery({
        queryKey:['isAdmin'],
        queryFn: async () => {
            if(!user) return false;
            const response=await axiosPublic.get(`/admin/check/${user.email}`)
            // console.log(response.data);
            return response.data
        },
        enabled:!!user,
        staleTime:10000, 
        refetchInterval:10000,
    })
  return [isAdmin,isPending]
}
