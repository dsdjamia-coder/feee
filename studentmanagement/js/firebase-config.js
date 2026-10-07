// Firebase Configuration for Madrasa Fee Management
// This file exposes the initialized Firebase app and Firestore database
// as globals (`app` and `db`) for the browser-based React application.

const firebaseConfig = {
    apiKey: "AIzaSyAAvxaW7bL7S_oD_xrElO4-XvuxnhfJKxc",
    authDomain: "noorul-islam-91eae.firebaseapp.com",
    projectId: "noorul-islam-91eae",
    storageBucket: "noorul-islam-91eae.firebasestorage.app",
    messagingSenderId: "1034149016792",
    appId: "1:1034149016792:web:befc9bf1eadcf2bd8653ad",
    measurementId: "G-ZFSQDL9MTB"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
