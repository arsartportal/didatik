// Firebase Core
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

// Authentication
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Firestore
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Analytics
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXIPhCEWrTVXf_AIg_liGkRSMkvYzulQ4",
  authDomain: "didatik-b2d27.firebaseapp.com",
  projectId: "didatik-b2d27",
  storageBucket: "didatik-b2d27.firebasestorage.app",
  messagingSenderId: "641027817253",
  appId: "1:641027817253:web:aed46f57e187d3767b24cc",
  measurementId: "G-TM48645RZ3"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export {
  app,
  auth,
  db,
  analytics
};