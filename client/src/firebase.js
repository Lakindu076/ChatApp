// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//
const firebaseConfig = {
  //apiKey: A unique API key that identifies your project to Firebase services. This key is used for authentication and authorization purposes
  apiKey: "AIzaSyBg3D8giNCWALfl2aeNTuHdAvYwwwD3Azw",
  //authDomain: The domain where Firebase will handle authentication for your app. This might involve logging users in or out using various authentication provider
  authDomain: "chatapp-59643.firebaseapp.com",
  projectId: "chatapp-59643",
  storageBucket: "chatapp-59643.appspot.com",
  messagingSenderId: "949988236485",
  appId: "1:949988236485:web:e0a92a71a62c0bb9e8e4ac",
  measurementId: "G-TZMTX2G22P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app