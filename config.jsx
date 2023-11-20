// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider,getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAqvuVHXkaJNVcfjSayx09foVaXFGf25M",
  authDomain: "logineiu.firebaseapp.com",
  projectId: "logineiu",
  storageBucket: "logineiu.appspot.com",
  messagingSenderId: "842137701220",
  appId: "1:842137701220:web:d5215e5196ebf9311b4871",
  measurementId: "G-8GGG8X7K1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
