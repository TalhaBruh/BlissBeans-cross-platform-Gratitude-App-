// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-K5oTQ-KDWOe-HPsJZZOEe1EpLvlQKzE",
  authDomain: "PillPal-aa350.firebaseapp.com",
  projectId: "PillPal-aa350",
  storageBucket: "PillPal-aa350.appspot.com",
  messagingSenderId: "165849024318",
  appId: "1:165849024318:web:deb5dd4d5dcf56b0714e6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;