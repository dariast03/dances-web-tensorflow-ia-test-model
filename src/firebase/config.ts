import { initializeApp } from "firebase/app";
/* import { getAuth } from "firebase/auth"; */
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQKayYC6oIlZYCEMrtmq0DgOo833ypkzM",
  authDomain: "secac-2ad66.firebaseapp.com",
  projectId: "secac-2ad66",
  storageBucket: "secac-2ad66.appspot.com",
  messagingSenderId: "310195200151",
  appId: "1:310195200151:web:a480904dc973e3cd2e49d2",
  measurementId: "G-KYG7H4GJXV",
};

export const FirebaseApp = initializeApp(firebaseConfig);
/*
export const FirebaseAuth = getAuth(FirebaseApp); */

export const FirebaseDB = getFirestore(FirebaseApp);
/*
export const FirebaseStorage = getStorage(FirebaseApp); */

/* export const FirebaseAnalytics = getAnalytics(FirebaseApp);

export const FirebaseMessaging = getMessaging(FirebaseApp); */

// export const FirebaseApp = initializeApp(firebaseConfig);

// export const FirebaseAuth = getAuth();
// connectAuthEmulator(FirebaseAuth, "http://127.0.0.1:9099");

// export const FirebaseDB = getFirestore();
// connectFirestoreEmulator(FirebaseDB, "127.0.0.1", 8081);

// export const FirebaseStorage = getStorage();

// export const FirebaseAnalytics = getAnalytics();

// export const FirebaseMessaging = getMessaging();
