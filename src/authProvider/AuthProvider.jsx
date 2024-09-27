import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext } from 'react'
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import auth from "../firebase/firebase.conf";
import useAxiosPublic from "../hooks/axios/useAxiosPublic";
import useAxiosSecure from "../hooks/axios/useAxiosSecure";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const axiosPublic=useAxiosPublic()
  const axiosSecure = useAxiosSecure()

  //authencaation processing 
  const registerUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }
  const loginUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
  const logOutUser = () => {
    setLoading(true);
    auth.signOut().then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sign Out Success",
        showConfirmButton: false,
        timer: 1000,
      });
      setUser(null);
    });
  }


  // user status management
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {

        const userEmail = currentUser?.email || user?.email
        const loginEmail = { email: userEmail };
        if (currentUser) {
            setUser(currentUser);
            setLoading(false);
            // console.log('============>>', currentUser)

            axiosSecure.post('/jwt', loginEmail)
                .then((res) => {
                    console.log('jwt',res.data)
                }).catch(err => console.error(err))

        } else {
            axiosSecure.post('/logout', loginEmail)
                .then((res) => {
                    console.log("Logout user",res.data)
                    setUser(null);
                    setLoading(false);
                }).catch(err => console.error(err));
        }
    });
    return () => unSubscribe();
}, [user]);

  const authinfo = {
    user, loading,
    logOutUser,registerUser, loginUser
  }
  return <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
}
