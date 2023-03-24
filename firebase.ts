import { initializeApp,  getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCmTWmdzKI9PZMYR42arPbqcuURnCpy8Ks",
    authDomain: "netflix-clone-1f58d.firebaseapp.com",
    projectId: "netflix-clone-1f58d",
    storageBucket: "netflix-clone-1f58d.appspot.com",
    messagingSenderId: "207401050592",
    appId: "1:207401050592:web:5ba97964cc664d80444b85",
    measurementId: "G-3S0NR3E62C"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
