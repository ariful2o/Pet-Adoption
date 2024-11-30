import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pet-adoption-server-production.up.railway.app',
});

export default function useAxiosPublic() {
  return instance
}