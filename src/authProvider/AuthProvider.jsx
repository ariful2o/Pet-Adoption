import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext } from 'react'
import { useState } from "react";
import { useEffect } from "react";
import auth from "../firebase/firebase.conf";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

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
        title: "Sign out Success",
        showConfirmButton: false,
        timer: 1000,
      });
    });
  }


  // user status management
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("Logged in as:", user.email);
        setUser(user)
      } else {
        // User is signed out
        // ...
        setUser(null)
        console.log("Logged out");
      }
    });

    // unsubscribe on unmount
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const authinfo = {
    user, loading,
    logOutUser,registerUser, loginUser
  }
  return <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
}
