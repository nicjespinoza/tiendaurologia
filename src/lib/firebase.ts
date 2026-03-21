// Polyfill location for Firebase SDK when rendering on the server.
if (typeof location === "undefined") {
  const origin = "https://localhost";
  // Minimal shape to satisfy URL base requirements in server render.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.location = {
    protocol: "https:",
    host: "localhost",
    hostname: "localhost",
    href: origin,
    origin,
  };
}
if (typeof window === "undefined") {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.window = { location: global.location };
}

import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (Object.values(firebaseConfig).some((v) => !v)) {
  console.warn("Firebase env vars are missing. Check your .env.local file.");
}

const isFirebaseEnabled = Object.values(firebaseConfig).every(Boolean);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (isFirebaseEnabled) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export { app, auth, db, storage, isFirebaseEnabled };
