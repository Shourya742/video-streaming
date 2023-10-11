import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDflJ3E_4o6aE22POpwCOxfWCWVxB-N6p0",
  authDomain: "video-stream-124c5.firebaseapp.com",
  projectId: "video-stream-124c5",
  storageBucket: "video-stream-124c5.appspot.com",
  messagingSenderId: "114690667655",
  appId: "1:114690667655:web:765e4d13da51687a867422",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function signInWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export function signOut() {
  return auth.signOut();
}

export function onAuthStateChangedHelper(
  callback: (user: User | null) => void
) {
  return onAuthStateChanged(auth, callback);
}
