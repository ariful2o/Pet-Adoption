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
      setUser(null);
      setLoading(false); // Set loading to false after sign out
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(true); // Start loading state
      if (currentUser) {
        setUser(currentUser);
        const loginEmail = { email: currentUser.email };
        
        axiosSecure.post('/jwt', loginEmail)
          .then((res) => {
            console.log('jwt', res.data);
            setLoading(false); // End loading when done
          }).catch(err => {
            console.error(err);
            setLoading(false); // End loading on error
          });
      } else {
        setUser(null);
        setLoading(false); // End loading when user is null
      }
    });
    return () => unSubscribe();
  }, [axiosSecure]); // Dependency on axiosSecure

  const authinfo = {
    user,
    loading,
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
