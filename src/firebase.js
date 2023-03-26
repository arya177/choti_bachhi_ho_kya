import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Your config here! 
  // Instructions https://support.google.com/firebase/answer/7015592?hl=en#zippy=%2Cin-this-article
  
    apiKey: "AIzaSyChG3E7Ppb9GZ_ij62vYoKbwgioqAR6o7s",
    authDomain: "hacktank-5277b.firebaseapp.com",
    projectId: "hacktank-5277b",
    storageBucket: "hacktank-5277b.appspot.com",
    messagingSenderId: "950633030024",
    appId: "1:950633030024:web:943ce4cd94a9e67b86da3d",
    measurementId: "G-270BV5PKXB"

};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
