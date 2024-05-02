// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-19d1f.firebaseapp.com",
  projectId: "mern-blog-19d1f",
  storageBucket: "mern-blog-19d1f.appspot.com",
  messagingSenderId: "484011042904",
  appId: "1:484011042904:web:fe7fb6a5a4716ea399c22d",
  measurementId: "G-SEJ3NDWJ7L"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app