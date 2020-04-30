import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzfo8-B3Uc6mAduCiqno2USpNpoGZj-IA",
  authDomain: "community-cloud-df5fd.firebaseapp.com",
  databaseURL: "https://community-cloud-df5fd.firebaseio.com",
  projectId: "community-cloud-df5fd",
  storageBucket: "community-cloud-df5fd.appspot.com",
  messagingSenderId: "166630878277",
  appId: "1:166630878277:web:a4ecd26dde0f3ea0dec72c",
  measurementId: "G-VDX79HMCMQ",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
