import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFckanY0NyUZn5S0yzm0UusNIFdnbeqzE",
  authDomain: "communal-6494e.firebaseapp.com",
  databaseURL: "https://communal-6494e.firebaseio.com",
  projectId: "communal-6494e",
  storageBucket: "communal-6494e.appspot.com",
  messagingSenderId: "1002121742877",
  appId: "1:1002121742877:web:4cc30961e1ce00926414f4",
  measurementId: "G-GFMWF0BTJT",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
