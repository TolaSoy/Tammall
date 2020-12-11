import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const config = {
    apiKey: "AIzaSyDA4XO2Ylx0aTdKfyMrjA3X7P_fLauLchw",
    authDomain: "product-eaa84.firebaseapp.com",
    databaseURL: "https://product-eaa84.firebaseio.com",
    projectId: "product-eaa84",
    storageBucket: "product-eaa84.appspot.com",
    messagingSenderId: "992929302081",
    appId: "1:992929302081:web:67360396ac945f31aea8c0",
    measurementId: "G-16JWMLCRLV"
};

!firebase.apps.length ? firebase.initializeApp(config) : "";

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
export default firebase;
export { auth, db, storage };