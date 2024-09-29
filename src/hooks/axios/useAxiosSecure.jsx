import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authProvider/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  // const { logOutUser } = useContext(AuthContext) // Use useAuth to get logOutUser
  // const navigate = useNavigate()
  
  axiosSecure.interceptors.request.use(
    (config) => {
      // Uncomment if you need to send a token
      // const token = localStorage.getItem("token");
      // config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response?.status;
      // console.log('status error in the interceptor', status);
      if (status === 401) {
        // logOutUser(); // Call logOutUser if unauthorized
        // navigate('/login')
        console.log(`user logged out`);
      } else {
        // console.log('navigate to login');
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
