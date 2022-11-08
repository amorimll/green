// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOhaGO8MsltyrZjEf_4zOOnksTd2S09OI",
  authDomain: "green-app-de1e3.firebaseapp.com",
  projectId: "green-app-de1e3",
  storageBucket: "green-app-de1e3.appspot.com",
  messagingSenderId: "127681994746",
  appId: "1:127681994746:web:8de35366f7bdc85db84e43"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const storage = getStorage()

export const auth = getAuth(app)
export const db = getFirestore(app);
export const storageRef = ref(storage, 'teste.jpg')


