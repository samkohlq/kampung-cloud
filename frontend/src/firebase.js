import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZ8p56tzf-5KrLnrrekQKJUbfg2-ITDAU",
  authDomain: "kampung-cloud-prod.firebaseapp.com",
  databaseURL: "https://kampung-cloud-prod.firebaseio.com",
  projectId: "kampung-cloud-prod",
  storageBucket: "kampung-cloud-prod.appspot.com",
  messagingSenderId: "537175327608",
  appId: "1:537175327608:web:4500ad3eab73d6b6edfe8d",
  measurementId: "G-XBZMZMGZMF",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
