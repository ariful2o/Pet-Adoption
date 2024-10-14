import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://b9a12-server-side-mohammadariful20-efgx.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default function useAxiosPublic() {
  return instance
}