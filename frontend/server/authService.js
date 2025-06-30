import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase';

export async function signUp(email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    await setDoc(doc(db, 'users', uid), {
        favorites: [],
        preferences: {},
        friends: []
    });
}

export async function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
    try {
        await signOut(auth);
        console.log('User logged out');
    } catch (error) {
        console.error('Logout error:', error);
    }
}

function onAuthStateChangedListener(callback) {
    return onAuthStateChanged(auth, callback);
}


export default onAuthStateChangedListener;