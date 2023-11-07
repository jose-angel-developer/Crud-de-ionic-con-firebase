import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAL--FqOPWtbX3_Syhbt6hC8Gjb-pINsao",
    authDomain: "vue-app-a7cb3.firebaseapp.com",
    projectId: "vue-app-a7cb3",
    storageBucket: "vue-app-a7cb3.appspot.com",
    messagingSenderId: "181839498322",
    appId: "1:181839498322:web:e9545c4c94bf423991a38b" 
  };
  

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  
  export { auth, firestore };