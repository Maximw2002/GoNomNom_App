
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjAafI7gjAsbreR8eOLCLtZySrD5ISOKY",
  authDomain: "gonomnom-c1049.firebaseapp.com",
  projectId: "gonomnom-c1049",
  storageBucket: "gonomnom-c1049.firebasestorage.app",
  messagingSenderId: "261883929672",
  appId: "1:261883929672:web:762d8c176ea2d86b24a47d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

