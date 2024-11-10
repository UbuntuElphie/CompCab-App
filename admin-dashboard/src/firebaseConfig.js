// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl626I27rWWJY6ZnOdJP2qZJ_p3WbnDiU",
  authDomain: "compcab-app-40132.firebaseapp.com",
  projectId: "compcab-app-40132",
  storageBucket: "compcab-app-40132.firebasestorage.app",
  messagingSenderId: "775144164921",
  appId: "1:775144164921:web:0464384c1452b6b159c7e8",
  measurementId: "G-VTLTLPF4YR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
