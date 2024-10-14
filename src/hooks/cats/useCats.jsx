import { useQuery } from 'react-query';
import useAxiosPublic from '../axios/useAxiosPublic';

export default function useCats() {
    const axiosPublic = useAxiosPublic();

    const { data: cats = [], refetch } = useQuery({
        queryKey: ['cats'],
        queryFn: async () => {
            const response = await axiosPublic.get('/cats');
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
