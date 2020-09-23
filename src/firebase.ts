import * as firebase from 'firebase/app';

// console.log(process.env.REACT_APP_FIREBASE_API_KEY);
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "hilihao-65f1d.firebaseapp.com",
  databaseURL: "https://hilihao-65f1d.firebaseio.com",
  projectId: "hilihao-65f1d",
  storageBucket: "hilihao-65f1d.appspot.com",
  messagingSenderId: "83385468065",
  appId: "1:83385468065:web:8efa1501066acf469e9ce0"
};

firebase.initializeApp(config);
export default firebase;
