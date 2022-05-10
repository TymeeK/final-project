import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';

import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, listAll } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
}

export async function signOutUser() {
    signOut(getAuth());
}

export async function getUser() {
    const auth = getAuth();
    const user = auth.currentUser;
    const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
            const userId = user.email;
            console.log(userId);
            return auth.currentUser;
        } else {
            console.log('Logged out');
        }
    });
    unsubscribe();
}

//Sign in user with email and password

export async function createUser(email, password) {
    const auth = getAuth();
    const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
    console.log(credentials);
}

export async function signInUser(email, password) {
    const auth = getAuth();
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user.user.uid);
}

//Firestore functions

export async function addUserData(email) {
    try {
        const docRef = await addDoc(collection(db, 'users'), {
            email: email,
            posts: [],
            followers: 0,
            following: 0,
        });
        console.log('Document written with ID: ', docRef.id);
    } catch (error) {
        console.error('Error adding document: ', error);
    }
}
