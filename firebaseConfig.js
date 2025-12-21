// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ_qvyXdvUvu6u7vMHeydZt27YFVqhqpc",
  authDomain: "todolist-6a342.firebaseapp.com",
  projectId: "todolist-6a342",
  storageBucket: "todolist-6a342.firebasestorage.app",
  messagingSenderId: "403152734608",
  appId: "1:403152734608:web:8a178d1840a8ae1a90cb15",
  measurementId: "G-WRESBYVB4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

export default firebaseConfig
