import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDzGHHhj8mSkPDkOePojqF-pWMoEVfCdcQ",
    authDomain: "curso-36a05.firebaseapp.com",
    projectId: "curso-36a05",
    storageBucket: "curso-36a05.appspot.com",
    messagingSenderId: "229388332618",
    appId: "1:229388332618:web:2c073cae010914346680b3",
    measurementId: "G-CGVL5VPXF6"
  };

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };