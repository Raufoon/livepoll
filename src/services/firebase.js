import firebase from 'firebase/app';

const initFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyBQSHVAGfc3pCsx6VBM-I0sMiT0r17Z5Ek",
    authDomain: "lllivepolll.firebaseapp.com",
    databaseURL: "https://lllivepolll.firebaseio.com",
    projectId: "lllivepolll",
    storageBucket: "lllivepolll.appspot.com",
    messagingSenderId: "1045079837725"
  });
};

export default initFirebase