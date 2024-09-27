import { useQuery } from 'react-query';
import useAxiosPublic from '../axios/useAxiosPublic';
import useAxiosSecure from '../axios/useAxiosSecure';

export default function useCats() {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    
    const { data: cats = [], refetch } = useQuery({
        queryKey: ['cats'],
        queryFn: async () => {
            const response = await axiosSecure.get('/cats');
            return response.data;
        },
        refetchInterval: (data) => {
            // If data is empty, refetch every 10 seconds
            return !data || data.length === 0 ? 10000 : false;
        },
        refetchOnWindowFocus: false, // Prevent refetch on window focus
        retry: false, // Disable retrying on failure
    });
    
    return [cats, refetch];
}
