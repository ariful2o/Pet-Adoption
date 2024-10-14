import { useQuery } from 'react-query'
import useAxiosPublic from '../axios/useAxiosPublic'

export default function useDogs() {
    const axiosPublic = useAxiosPublic()

    const { data: dogs = [], refetch ,isLoading} = useQuery({
        queryKey: ['dogs'],
        queryFn: async () => {
            const response = await axiosPublic.get('/dogs')
            return response.data
        },
        refetchInterval: (data) => {
            // If data is empty, refetch every 10 seconds
            return !data || data.length === 0 ? 10000 : false  // 10 seconds
        },
        refetchOnWindowFocus: false, // Prevent refetch on window focus
        retry: false, // Disable retrying on failure
    })
    return [dogs, refetch,isLoading];
}
