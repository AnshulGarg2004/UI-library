
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
    authDomain: "virtual-ui-7cb0c.firebaseapp.com",
    projectId: "virtual-ui-7cb0c",
    storageBucket: "virtual-ui-7cb0c.firebasestorage.app",
    messagingSenderId: "776082311235",
    appId: "1:776082311235:web:6d346def1cda6b17d6acf6"
};

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};