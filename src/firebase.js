// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyj3Q3HdIEToT_IY8gxIxzSDWt_cVSZOs",
  authDomain: "fast-recipe-7aa79.firebaseapp.com",
  projectId: "fast-recipe-7aa79",
  storageBucket: "fast-recipe-7aa79.appspot.com",
  messagingSenderId: "54427158958",
  appId: "1:54427158958:web:77ab9bc6a6c6e76dfe603f",
  measurementId: "G-1E84GZ7KR2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app)