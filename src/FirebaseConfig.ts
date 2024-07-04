import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzVvh_4DoIDHUYVOEwzGNI42O0ql6HkfY",
  authDomain: "nextjsproject-aa49b.firebaseapp.com",
  projectId: "nextjsproject-aa49b",
  storageBucket: "nextjsproject-aa49b.appspot.com",
  messagingSenderId: "707358069835",
  appId: "1:707358069835:web:c3affb2401a7b74824e9ce",
  measurementId: "G-S7XY8QTZPY"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export {storage}