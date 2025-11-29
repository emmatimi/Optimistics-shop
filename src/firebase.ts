
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// You can find this in the Firebase Console -> Project Settings
const firebaseConfig = {
  apiKey: "AIzaSyBIZ89OoyCYUFtCBP05jdx3WIkYm4_sbLo",
  authDomain: "optimistics-shop.firebaseapp.com",
  projectId: "optimistics-shop",
  storageBucket: "optimistics-shop.firebasestorage.app",
  messagingSenderId: "801750939186",
  appId: "1:801750939186:web:acbed6718e8fd645de6e2b",
  measurementId: "G-LJSRQRHZHB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

