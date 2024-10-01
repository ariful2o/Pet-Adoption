import { useQuery } from "react-query"
import useAxiosSecure from "../axios/useAxiosSecure"
import useUser from "../userInfo/useUser"



export default function useMyPets() {
    const { displayName, email, photoURL } = useUser()
    const axiosSecure = useAxiosSecure()
    const { data: mypets = [], refetch } = useQuery({
        queryKey: ["mypets", email],
        queryFn: async () => {
            const response = await axiosSecure.post(`/mypets`, { email })
            return response.data
        },
        refetchInterval: (data) => {
            // If data is empty, refetch every 10 seconds
            return !data || data.length === 0 ? 10000 : false  // 10 seconds
        },
        refetchOnWindowFocus: false, // Prevent refetch on window focus
        retry: false, // Disable retrying on failure
    })
  return [mypets, refetch]
}
