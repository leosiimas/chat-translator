import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDxvBRF8QgRGn7vBazxI45DZDG2YPSoEBo",
  authDomain: "chat-translator-606a4.firebaseapp.com",
  databaseURL: "https://chat-translator-606a4-default-rtdb.firebaseio.com",
  projectId: "chat-translator-606a4",
  storageBucket: "chat-translator-606a4.firebasestorage.app",
  messagingSenderId: "294921272291",
  appId: "1:294921272291:web:1a48883d6c8a173ed47ed6",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
