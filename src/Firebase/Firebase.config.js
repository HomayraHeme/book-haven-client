// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEm5Tiy7bkqLDOQIxfHH3ZvXobUlUEFNo",
    authDomain: "book-haven-48f66.firebaseapp.com",
    projectId: "book-haven-48f66",
    storageBucket: "book-haven-48f66.firebasestorage.app",
    messagingSenderId: "13056142525",
    appId: "1:13056142525:web:7f3fe6e771be1aff939bd4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;