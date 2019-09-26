import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBBFrIK16ve8Jwu7SJFmw-c6y5vzHw70ig",
  authDomain: "eventmanager-4c064.firebaseapp.com",
  databaseURL: "https://eventmanager-4c064.firebaseio.com",
  projectId: "eventmanager-4c064",
  storageBucket: "eventmanager-4c064.appspot.com",
  messagingSenderId: "849403212630",
  appId: "1:849403212630:web:bc79a91dec2d50d5f49cf7"
};

firebase.initializeApp(config);
export default firebase;
