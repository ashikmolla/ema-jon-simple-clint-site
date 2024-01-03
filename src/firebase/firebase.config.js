// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe9ym0rh5gqw1P4w0m1918vfB2gI0aw_Q",
  authDomain: "ema-jon-simpole-auth.firebaseapp.com",
  projectId: "ema-jon-simpole-auth",
  storageBucket: "ema-jon-simpole-auth.appspot.com",
  messagingSenderId: "550258558949",
  appId: "1:550258558949:web:36d098fc5d2236b96a510c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;