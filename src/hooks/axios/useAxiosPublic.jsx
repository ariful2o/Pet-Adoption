import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pet-adoption-server-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default function useAxiosPublic() {
  return instance
}