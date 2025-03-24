import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSOYCZNGYsBPe23zcD0wPbuKVoNdur2mY",
  authDomain: "verdant-cable-380008.firebaseapp.com",
  databaseURL:
    "https://verdant-cable-380008-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "verdant-cable-380008",
  storageBucket: "verdant-cable-380008.firebasestorage.app",
  messagingSenderId: "453026078558",
  appId: "1:453026078558:web:bcccd1f1d721127602b9cf",
  measurementId: "G-PY5N67ZTD3",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics, firestore };
