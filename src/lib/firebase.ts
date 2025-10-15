// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi5TVldNEMUuU9N0u9WxYmo_lHqu3glnI",
  authDomain: "studio-4267155781-77c8c.firebaseapp.com",
  projectId: "studio-4267155781-77c8c",
  storageBucket: "studio-4267155781-77c8c.appspot.com",
  messagingSenderId: "360536184435",
  appId: "1:360536184435:web:f1fd70d38a1c9f0da73c06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
