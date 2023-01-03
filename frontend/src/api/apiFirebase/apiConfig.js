// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzEpyMhxwftklVezTIJYrWdv-ItdiO6kA",
  authDomain: "app-streaming-unir.firebaseapp.com",
  projectId: "app-streaming-unir",
  storageBucket: "app-streaming-unir.appspot.com",
  messagingSenderId: "333505250202",
  appId: "1:333505250202:web:3b85748b6606e21a8df023"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);