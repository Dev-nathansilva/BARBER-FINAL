// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; //

const firebaseConfig = {
    apiKey: "AIzaSyAzLp0G8zgZkG6H1mfcHaWWBRnK2f20FZU",
    authDomain: "barbearia-f25de.firebaseapp.com",
    projectId: "barbearia-f25de",
    storageBucket: "barbearia-f25de.appspot.com",
    messagingSenderId: "1054902851396",
    appId: "1:1054902851396:web:7f0024f7a3722401372911",
    measurementId: "G-Y60R0MMZEZ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
