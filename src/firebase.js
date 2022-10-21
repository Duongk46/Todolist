
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAs78N3vKMl5W5YUU-OEA4i37RQFTkL9Ac",
  authDomain: "todolist-3cabe.firebaseapp.com",
  projectId: "todolist-3cabe",
  storageBucket: "todolist-3cabe.appspot.com",
  messagingSenderId: "610200015970",
  appId: "1:610200015970:web:e37c82f4ae5d36b1cb2d3b"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);