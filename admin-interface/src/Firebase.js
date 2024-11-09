// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuemof5rEU5Khz9Jzlmutx4DHq12JYiTo",
  authDomain: "compcab-app.firebaseapp.com",
  projectId: "compcab-app",
  storageBucket: "compcab-app.firebasestorage.app",
  messagingSenderId: "263175591194",
  appId: "1:263175591194:web:f805d1346e3483e229c8a3",
  measurementId: "G-WLGZZ6JZE1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

export { db, analytics };
