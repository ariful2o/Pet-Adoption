

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
export default function useMyPets() {
  return [mypets, refetch]
}
