// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCM6h_sX2Kv4dzmdPk0nimkW3P9RxSjhj4",
  authDomain: "business-apps-ef958.firebaseapp.com",
  projectId: "business-apps-ef958",
  storageBucket: "business-apps-ef958.appspot.com",
  messagingSenderId: "1004412458904",
  appId: "1:1004412458904:web:caa465980facad54e53ded",
  measurementId: "G-4HNPK4XFDZ"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app)
 export const storage=getStorage(app);
//  const analytics = getAnalytics(app);