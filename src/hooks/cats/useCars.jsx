import { useQuery } from 'react-query'
import useAxiosPublic from '../axios/useAxiosPublic'

export default function useCats() {
    const axiosPublic = useAxiosPublic()
    
    const { data: cats = [],refetch} = useQuery({
        queryKey: ['cats'],
        queryFn: async () => {
            const response = await axiosPublic.get('/cats')
            return response.data
        },
        refetchInterval: 10000, // refetch every 10 seconds
    })
    return [cats,refetch]
}
