
'use client';

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { useAuth as useFirebaseAuth, useUser } from './auth/use-user';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';
import { FirebaseProvider, useFirebase, useFirebaseApp, useFirestore } from './provider';
import FirebaseClientProvider from './client-provider';
import { firebaseConfig } from './config';

function initializeFirebase(): {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
} {
  const apps = getApps();
  const firebaseApp = !apps.length ? initializeApp(firebaseConfig) : apps[0];
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  return { firebaseApp, auth, firestore };
}

// Re-exporting hooks and providers
export {
  initializeFirebase,
  FirebaseProvider,
  FirebaseClientProvider,
  useCollection,
  useDoc,
  useUser,
  useFirebase,
  useFirebaseApp,
  useFirestore,
};

// This is the correct hook to get the user and loading state
export const useAuth = useFirebaseAuth;
