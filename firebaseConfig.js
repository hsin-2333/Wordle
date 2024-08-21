// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "wordle-69e76.firebaseapp.com",
  projectId: "wordle-69e76",
  storageBucket: "wordle-69e76.appspot.com",
  messagingSenderId: "993499341224",
  appId: "1:993499341224:web:f90195b4f771c67ff3bd9d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
