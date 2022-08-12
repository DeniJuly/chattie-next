// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQh5fWbbWeUhq2vT1yJvaGBCbmeSYkxnM",
  authDomain: "chattie-deni.firebaseapp.com",
  projectId: "chattie-deni",
  storageBucket: "chattie-deni.appspot.com",
  messagingSenderId: "124743082971",
  appId: "1:124743082971:web:5191849e28186905b1bdfe",
  measurementId: "G-DZQQJ114VH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
