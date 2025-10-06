import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHLZ4mHi8N9Q1owtr90dYXkELJtF1nHB0",
  authDomain: "hazard-world.firebaseapp.com",
  projectId: "hazard-world",
  storageBucket: "hazard-world.appspot.com",
  messagingSenderId: "963824198185",
  appId: "1:963824198185:web:c1accd58c2caa2016db238",
  measurementId: "G-XE4F875WHT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
