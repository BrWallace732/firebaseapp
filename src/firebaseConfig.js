import firebase from "firebase";
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDbeZZHN-oCBpKRZtNX3l8vgIh6j6QPQy8",
    authDomain: "vuejsfire-11460.firebaseapp.com",
    databaseURL: "https://vuejsfire-11460-default-rtdb.firebaseio.com",
    projectId: "vuejsfire-11460",
    storageBucket: "vuejsfire-11460.appspot.com",
    messagingSenderId: "826695638554",
    appId: "1:826695638554:web:922238d3672ed4e32a3ba3"
};
  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth()

export {auth}