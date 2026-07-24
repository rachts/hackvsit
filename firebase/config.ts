"use client"

// Firebase configuration - initialization happens lazily on first use
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
}

// Cached instances - each service initialized independently
let cachedApp: any = null
let cachedAuth: any = null
let cachedDb: any = null
let cachedStorage: any = null

async function getFirebaseApp() {
  if (typeof window === "undefined") {
    throw new Error("Firebase can only be initialized on the client side")
  }

  if (cachedApp) {
    return cachedApp
  }

  const { initializeApp, getApps, getApp } = await import("firebase/app")
  cachedApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
  return cachedApp
}

export async function getFirestoreDb() {
  if (typeof window === "undefined") {
    throw new Error("Firestore is not available on the server")
  }

  if (cachedDb) {
    return cachedDb
  }

  const app = await getFirebaseApp()
  const { getFirestore } = await import("firebase/firestore")
  cachedDb = getFirestore(app)
  return cachedDb
}

export async function getFirebaseStorage() {
  if (typeof window === "undefined") {
    throw new Error("Firebase Storage is not available on the server")
  }

  if (cachedStorage) {
    return cachedStorage
  }

  const app = await getFirebaseApp()
  const { getStorage } = await import("firebase/storage")
  cachedStorage = getStorage(app)
  return cachedStorage
}

export async function getFirebaseAuth() {
  if (typeof window === "undefined") {
    throw new Error("Firebase Auth is not available on the server")
  }

  if (cachedAuth) {
    return cachedAuth
  }

  const app = await getFirebaseApp()
  const { getAuth } = await import("firebase/auth")
  cachedAuth = getAuth(app)
  return cachedAuth
}

export async function getGoogleProvider() {
  const { GoogleAuthProvider } = await import("firebase/auth")
  return new GoogleAuthProvider()
}

// Legacy function for backward compatibility
export async function getFirebase() {
  if (typeof window === "undefined") {
    throw new Error("Firebase is not available on the server")
  }

  const [app, auth, db, storage] = await Promise.all([
    getFirebaseApp(),
    getFirebaseAuth(),
    getFirestoreDb(),
    getFirebaseStorage(),
  ])

  return { app, auth, db, storage }
}

export { firebaseConfig }
