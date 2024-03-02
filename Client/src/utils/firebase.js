// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyCtvC3uDcF6gaftbArQBpzvOZGSbpEfFL4",
    authDomain: "codelab-95a3d.firebaseapp.com",
    projectId: "codelab-95a3d",
    storageBucket: "codelab-95a3d.appspot.com",
    messagingSenderId: "109412438316",
    appId: "1:109412438316:web:b4b6acec0e7062599e9c89",
    measurementId: "G-TKNFEJ7WHE"
  };
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;