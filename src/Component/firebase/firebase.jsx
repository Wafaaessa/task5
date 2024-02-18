
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAgIdmMe1B7lOSqjPUYubpJ-qRwFuNVuQM",
      authDomain: "chat-app-34ee2.firebaseapp.com",
      projectId: "chat-app-34ee2",
      storageBucket: "chat-app-34ee2.appspot.com",
      messagingSenderId: "386122463120",
      appId: "1:386122463120:web:ba5870982ec143d3d32515",
      measurementId: "G-W46TXYMRRC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

 




