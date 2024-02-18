
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 
import 'firebase/compat/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyAgIdmMe1B7lOSqjPUYubpJ-qRwFuNVuQM",
  authDomain: "chat-app-34ee2.firebaseapp.com",
  projectId: "chat-app-34ee2",
  storageBucket: "chat-app-34ee2.appspot.com",
  messagingSenderId: "386122463120",
  appId: "1:386122463120:web:ba5870982ec143d3d32515",
  measurementId: "G-W46TXYMRRC"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const db = firebaseApp.firestore(); 
export const storage = firebaseApp.storage(); 
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default firebaseApp;
