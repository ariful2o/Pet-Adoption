import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react";
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

  // social provider
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider()

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // social log in

  // google login
  const googleLogin = () => {
    setLoading(true)
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        if (user) {
          setUser(user); // Set user state
          setLoading(false); // Set loading to false after sign in
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Signin Success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
  }

  // git hub login
  const gitHubLogin = () => {
    setLoading(true)
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        if (user) {
          setUser(user); // Set user state
          setLoading(false); // Set loading to false after sign in
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Signin Success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
  }

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



      const details = { name: loginName.name, email: loginEmail.email }
      if (currentUser) {
        axiosSecure.post('/jwt', loginEmail)
          .then(() => {

            // add user database
            axiosPublic.post("/user", details)
              .then(() => {
              })

          })
      } else {
        axiosSecure.post("/logout", loginEmail)
          .then(() => {
            setLoading(false); // End loading when done
          })
      }
    });
    return () => unSubscribe();
  }, [user, axiosSecure, axiosPublic]); // Dependency on axiosSecure


  const authinfo = { user, setUser, loading, setLoading, logOutUser, registerUser, loginUser,gitHubLogin,googleLogin };

  return (
    <AuthContext.Provider value={authinfo}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};