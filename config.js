import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyA5TxU-y0OCTYnMmGXHIDr6z7oUMgxt9JE",
  authDomain: "task-manager-2888d.firebaseapp.com",
  projectId: "task-manager-2888d",
  storageBucket: "task-manager-2888d.appspot.com",
  messagingSenderId: "222161916466",
  appId: "1:222161916466:web:b4c83b3ff44ad8250b222b"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase.firestore()