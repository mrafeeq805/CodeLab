// Import the functions you need from the SDKs you need
const { FirebaseError, initializeApp } = require("firebase/app") 
const { getAnalytics } = require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuN7VgnJ6ztVwS42EN39R7vBc-tAjdxYY",
  authDomain: "codelab-1ea47.firebaseapp.com",
  projectId: "codelab-1ea47",
  storageBucket: "codelab-1ea47.appspot.com",
  messagingSenderId: "821673228252",
  appId: "1:821673228252:web:715924a2e3e1abbafe8119",
  measurementId: "G-PN531MVWCH"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseApp