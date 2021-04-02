import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBN3LOK2NgubjnYRCdoRZu3Iwj_PYvGL0c",
    authDomain: "whatsapp-2-275ad.firebaseapp.com",
    projectId: "whatsapp-2-275ad",
    storageBucket: "whatsapp-2-275ad.appspot.com",
    messagingSenderId: "972404421518",
    appId: "1:972404421518:web:29854567aeacfff531aadf",
    measurementId: "G-E1N731T8ZX"
  };


  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig):firebase.app();
  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  
  
  export {db ,auth, provider};