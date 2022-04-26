import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
} from 'firebase/auth';

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

export async function signIn() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
}

export async function signOutUser() {
    signOut(getAuth());
}

export function getUser() {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
        if (user) {
            const userId = user.email;
            console.log(userId);
        } else {
            console.log('Logged out');
        }
    });
}

export async function createUser(email, password) {
    const auth = getAuth();
    const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
    console.log(credentials);
}
