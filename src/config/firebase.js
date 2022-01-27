import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLS5GAMwadj82Qz1Ol5LboqJ1Ds5NKCPg",
  authDomain: "dating-e2e6a.firebaseapp.com",
  projectId: "dating-e2e6a",
  storageBucket: "dating-e2e6a.appspot.com",
  messagingSenderId: "12792580097",
  appId: "1:12792580097:web:188c77f1c4aa3113649800",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
