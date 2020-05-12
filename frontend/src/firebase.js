import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_CONFIG_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_CONFIG_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_CONFIG_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_CONFIG_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
export default firebase;
