import { useQuery } from 'react-query'
import useAxiosPublic from '../axios/useAxiosPublic'
import useUser from '../userInfo/useUser'

export default function useMyRequest() {
    const axiosPublic = useAxiosPublic()
    const { email } = useUser()

    const { data: myRequest = [], refetch } = useQuery({
        queryKey: ['myRequest'],
        queryFn: async () => {
            const response = await axiosPublic.post(`/myrequest`, { email })
            return response.data
        },
        refetchInterval: 60000, // every minute
    })
    return [myRequest, refetch]
}
