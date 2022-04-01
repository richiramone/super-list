import { FirebaseApp, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBpi2cEUjlcj8PfiI8xKHXCPA1DRdwT2I4",
  authDomain: "super-9a549.firebaseapp.com",
  databaseURL:
    "https://super-9a549-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "super-9a549",
  storageBucket: "super-9a549.appspot.com",
  messagingSenderId: "274617340632",
  appId: "1:274617340632:web:832e8c2e020274bd383dad",
};

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
