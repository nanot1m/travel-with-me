import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseInstance = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "travel-with-me-1546628039571.firebaseapp.com",
  databaseURL: "https://travel-with-me-1546628039571.firebaseio.com",
  projectId: "travel-with-me-1546628039571",
  storageBucket: "travel-with-me-1546628039571.appspot.com",
  messagingSenderId: "1080274551546"
});

var db = firebaseInstance.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

export { firebaseInstance, db };
