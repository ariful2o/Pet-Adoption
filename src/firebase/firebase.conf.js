// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWikCS5iNRaGUsi3c1QTRUmpUXTzAUxvI",
  authDomain: "pet-adoption-c569a.firebaseapp.com",
  projectId: "pet-adoption-c569a",
  storageBucket: "pet-adoption-c569a.appspot.com",
  messagingSenderId: "179381126180",
  appId: "1:179381126180:web:70e6a473ef7bd1c3a184b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;