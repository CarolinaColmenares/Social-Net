import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js';
import {
  getFirestore, doc, setDoc, collection, addDoc, query, where, getDocs, getDoc, deleteDoc, orderBy, arrayUnion, arrayRemove
} from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js';

import { firebaseConfig } from './config.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
  sendEmailVerification,
  signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
// signInWithRedirect(auth, provider);

export {
  auth,
  app,
  db,
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  arrayUnion,
  arrayRemove,
  signInWithPopup,
  provider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
  sendEmailVerification,
};
