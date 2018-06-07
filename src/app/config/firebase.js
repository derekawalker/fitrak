import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCv0_CUjynvTz5xa_11NbAmqvidrqozU4s",
  authDomain: "fi-trak.firebaseapp.com",
  databaseURL: "https://fi-trak.firebaseio.com",
  projectId: "fi-trak",
  storageBucket: "fi-trak.appspot.com",
  messagingSenderId: "540290139881"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);
export default firebase;
