
import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCjAafI7gjAsbreR8eOLCLtZySrD5ISOKY",
  authDomain: "gonomnom-c1049.firebaseapp.com",
  projectId: "gonomnom-c1049",
  storageBucket: "gonomnom-c1049.firebasestorage.app",
  messagingSenderId: "261883929672",
  appId: "1:261883929672:web:762d8c176ea2d86b24a47d"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const authAuth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };

