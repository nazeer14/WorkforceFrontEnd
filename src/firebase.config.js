// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDGVD-5Y5guvVUh06CMk7aDxfLB4IY0zE4",
    authDomain: "servora-2ff62.firebaseapp.com",
    projectId: "servora-2ff62",
    storageBucket: "servora-2ff62.firebasestorage.app",
    messagingSenderId: "381130995761",
    appId: "1:381130995761:web:599e88a9f97c940472fd10",
    measurementId: "G-M20NQZ3731"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
