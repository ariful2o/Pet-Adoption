import axios from "axios";
import useAuth from "../auth/useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosSecure = () => {
// const {logOutUser}=useAuth()
  // request interceptor to add authorization header for every secure call to teh api
  axiosSecure.interceptors.request.use(
    function (config) {
    //   const token = localStorage.getItem("token");
    //   // console.log('request stopped by interceptors', token)
    //   config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response?.status;
      console.log('status error in the interceptor', status);
      // for 401 or 403 logout the user and move the user to the login
      if (status === 401 || status === 403) {
        // await logOutUser();
        // navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};
export default useAxiosSecure;












// import axios from "axios";
// import { signOut } from "firebase/auth";
// import auth from "../../firebase/firebase.conf";

// const axiosSecure = axios.create({
//      baseURL: "http://localhost:5000",
//   withCredentials: true,
// });

// // Add a request interceptor
// axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {

//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
// }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     if (error.response.status === 401 ) {
//         signOut(auth)
//             .then(() => {
//                 console.log('logout user');
//             })
//     }
//     return Promise.reject(error);
// });

// const useAxiosSecure = () => {
//     return axiosSecure;
// };

// export default useAxiosSecure;