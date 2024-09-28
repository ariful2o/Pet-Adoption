import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import auth from "../firebase/firebase.conf";
import useAxiosPublic from "../hooks/axios/useAxiosPublic";
import useAxiosSecure from "../hooks/axios/useAxiosSecure";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = () => {
    setLoading(true);
    signOut(auth).then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sign Out Success",
        showConfirmButton: false,
        timer: 1000,
      });
      // setUser(null);
      // setLoading(false); // Set loading to false after sign out
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(true); // Start loading state
      setUser(currentUser);
      setLoading(false); // End loading when done
      
      
      // Get user information if user is logged in
      const loginEmail = { email: currentUser?.email || user.email };
      const loginName = { name: currentUser?.displayName || user.displayName };
      
      // console.log(currentUser, '=======');
      
      
      const details = { name: loginName.name, email: loginEmail.email }
      if (currentUser) {
        axiosSecure.post('/jwt', loginEmail)
          .then((res) => {
            // console.log('jwt', res.data);
            // setLoading(false); // End loading when done


            // add user database
            axiosPublic.post("/user", details)
              .then((response) => {
                console.log(response, '----');
              })

          })
      } else {
        axiosSecure.post("/logout", loginEmail)
        then(() => {
          console.log('logout success');
          setLoading(false); // End loading when done
        })
      }
    });
    return () => unSubscribe();
  }, [user, axiosSecure]); // Dependency on axiosSecure


  const authinfo = {
    user,
    setUser,
    loading,
    setLoading,
    logOutUser,
    registerUser,
    loginUser,
  };

  return (
    <AuthContext.Provider value={authinfo}>
      {children}
    </AuthContext.Provider>
  );
}
