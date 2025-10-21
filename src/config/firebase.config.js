import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5ST0s0re_Xf0vtKiPpusK3rKSTMR-vgg",
  authDomain: "resume-builder-2025-4cf2a.firebaseapp.com",
  projectId: "resume-builder-2025-4cf2a",
  storageBucket: "resume-builder-2025-4cf2a.firebasestorage.app",
  messagingSenderId: "827922049607",
  appId: "1:827922049607:web:862b3e239c7aefc7795f62"
};
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth};