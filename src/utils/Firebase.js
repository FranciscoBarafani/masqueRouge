//Firebase Import
import firebase from "firebase/app";
require("firebase/auth");
//Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyA0r4IUeMI6Qau82nPt7EqPiW2pBAu-HWo",
  authDomain: "masquerouge-88c27.firebaseapp.com",
  databaseURL: "https://masquerouge-88c27.firebaseio.com",
  projectId: "masquerouge-88c27",
  storageBucket: "masquerouge-88c27.appspot.com",
  messagingSenderId: "546091894210",
  appId: "1:546091894210:web:5d433a5f320aad8b2c825b",
};
//Firebase Initialize
export default firebase.initializeApp(firebaseConfig);
