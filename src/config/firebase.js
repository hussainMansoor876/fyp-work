import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyC8DRxbVU0vPb7mhJIhUhCQJHw9O6UDfeY",
    authDomain: "venue-club.firebaseapp.com",
    databaseURL: "https://venue-club.firebaseio.com",
    projectId: "venue-club",
    storageBucket: "",
    messagingSenderId: "836378910974",
    appId: "1:836378910974:web:08d0af2b92b6a7c6"
  };

  firebase.initializeApp(config);
  export default firebase;
 