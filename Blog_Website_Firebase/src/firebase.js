import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMR29WqFAtZUw7w4t4SUh6sZKcb06fDgk",
  authDomain: "blog-app-f50fa.firebaseapp.com",
  projectId: "blog-app-f50fa",
  storageBucket: "blog-app-f50fa.firebasestorage.app",
  messagingSenderId: "810881979120",
  appId: "1:810881979120:web:41362c991a640ca736e835",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
