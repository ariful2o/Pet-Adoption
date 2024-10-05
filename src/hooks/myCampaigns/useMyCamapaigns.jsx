import { useQuery } from "react-query";
import useAxiosPublic from "../axios/useAxiosPublic";
import useUser from "../userInfo/useUser";

export default function useMyCampaigns() {
    const axiosPublic = useAxiosPublic();
    const { email } = useUser(); // Get user's email from context or state management library.

    const { data: mycampaigns = [], refetch, isLoading, isError } = useQuery({
        queryKey: ["mycampaigns", email], // Include email in query key for better cache management
        queryFn: async () => {
            const response = await axiosPublic.post(`/campaigns`,{email});
            return response.data;
        },
        onError: (error) => {
            console.error("Error fetching campaigns:", error);
        },
    });

    return { mycampaigns, refetch, isLoading, isError };
}
