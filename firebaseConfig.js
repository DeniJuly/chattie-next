import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQh5fWbbWeUhq2vT1yJvaGBCbmeSYkxnM",
  authDomain: "chattie-deni.firebaseapp.com",
  projectId: "chattie-deni",
  storageBucket: "chattie-deni.appspot.com",
  messagingSenderId: "124743082971",
  appId: "1:124743082971:web:5191849e28186905b1bdfe",
  measurementId: "G-DZQQJ114VH",
};

export const app =
  getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

export const database = getFirestore(app);
