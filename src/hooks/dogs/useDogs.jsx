import { useQuery } from 'react-query'
import useAxiosPublic from '../axios/useAxiosPublic'

export default function useDogs() {
    const axiosPublic = useAxiosPublic()
    
    const { data: dogs = [],refetch} = useQuery({
        queryKey: ['dogs'],
        queryFn: async () => {
            const response = await axiosPublic.get('/dogs')
            return response.data
        },
        refetchInterval: 10000, // refetch every 10 seconds
    })
    return [dogs,refetch]
}
