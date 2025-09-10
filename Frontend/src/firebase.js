


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZixwpoBbjQ89c4tjlvp5co_gEMibU6ZI",
  authDomain: "myproject-bdc1d.firebaseapp.com",
  databaseURL: "https://myproject-bdc1d-default-rtdb.firebaseio.com",
  projectId: "myproject-bdc1d",
  storageBucket: "myproject-bdc1d.firebasestorage.app",
  messagingSenderId: "964340889257",
  appId: "1:964340889257:web:da763afec6f7f037535bb8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);