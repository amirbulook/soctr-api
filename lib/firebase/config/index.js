// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9tK3LUxr16rh-vSIunrcJl9nvXk1PYDg",
  authDomain: "soctra-amir.firebaseapp.com",
  projectId: "soctra-amir",
  storageBucket: "soctra-amir.appspot.com",
  messagingSenderId: "833098755873",
  appId: "1:833098755873:web:310a84483500c354bcd860",
  measurementId: "G-8L5YQDNPK0",
};

// Initialize Firebase

module.exports = initializeApp(firebaseConfig);
