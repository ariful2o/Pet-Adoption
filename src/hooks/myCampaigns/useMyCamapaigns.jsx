import { useQuery } from "react-query";
import useAxiosSecure from "../axios/useAxiosSecure";
import useUser from "../userInfo/useUser";

export default function useMyCampaigns() {
    const axiosSecure = useAxiosSecure()
    const { email } = useUser(); // Get user's email from context or state management library.
    const { data: mycampaigns = [], refetch, isLoading, isError } = useQuery({
        queryKey: ["mycampaigns", email], // Include email in query key for better cache management
        queryFn: async () => {
            const response = await axiosSecure.get(`/campaigns?email=${email}`);
            return response.data;
        },
        refetchInterval: 100000, // refetch every 10 seconds
        staleTime: 1000 * 60 * 5, // 5 minutes stale
        onError: (error) => {
            console.error("Error fetching campaigns:", error);
        },
    });

    return { mycampaigns, refetch, isLoading, isError };
}
