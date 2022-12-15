// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf9aG949eV4A6wH2p8_32cI8X_aUe4xLo",
  authDomain: "testproject-3a860.firebaseapp.com",
  projectId: "testproject-3a860",
  storageBucket: "testproject-3a860.appspot.com",
  messagingSenderId: "11173003869",
  appId: "1:11173003869:web:f5051a72af087e5399c3b4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
